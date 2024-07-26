package com.teamblue.Management_App.services.impl;

import com.teamblue.Management_App.dtos.BasicUserDto;
import com.teamblue.Management_App.dtos.CredentialsDto;
import com.teamblue.Management_App.dtos.FullUserDto;
import com.teamblue.Management_App.dtos.UserRequestDto;
import com.teamblue.Management_App.entities.User;
import com.teamblue.Management_App.exceptions.BadRequestException;
import com.teamblue.Management_App.mappers.UserMapper;
import com.teamblue.Management_App.repositories.UserRepository;
import com.teamblue.Management_App.services.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    private void validateUserRequest(UserRequestDto userRequestDto){
		if(userRequestDto == null || userRequestDto.getCredentials() == null || userRequestDto.getProfile() == null) {
			throw new BadRequestException("Missing credentials or profile");
		}
		String username = userRequestDto.getCredentials().getUsername();
		String password = userRequestDto.getCredentials().getPassword();
		String email = userRequestDto.getProfile().getEmail();
		
		if(username == null || password == null || email == null) {
			throw new BadRequestException("Missing either credentials or profile fields.");
		}
	}

    @Override
    public FullUserDto login(CredentialsDto credentialsDto) {
//    	System.out.println("CREDS: "+ credentialsDto + credentialsDto.getUsername());
        User user = userRepository.findByCredentialsUsername(credentialsDto.getUsername());
//      System.out.println("ASSIGNED TO USER: "+ userRepository.findByCredentialsUsername(credentialsDto.getUsername()));
        if (user == null || !user.getCredentials().getPassword().equals(credentialsDto.getPassword()) || !user.getActive()) {
            throw new IllegalArgumentException("Invalid credentials or inactive user");
        }
        System.out.println("USER:");
        System.out.println(user);
        System.out.println(userMapper.entityToDto(user));
        return userMapper.entityToDto(user);
    }
    
    @Override
	public List<BasicUserDto> getAllUsers() {
		return userMapper.entitiesToBasicUserDtos(userRepository.findAll());
	}
    
    @Override
    public FullUserDto createUser(UserRequestDto userRequestDto) {
    	validateUserRequest(userRequestDto);
    	
    	User userToCreate = userMapper.requestDtoToEntity(userRequestDto);
		User userExists = userRepository.findByCredentialsUsername(userToCreate.getCredentials().getUsername());
		System.out.println("userExists: " + userExists);
		if(userExists != null && !userExists.getActive()){
			throw new BadRequestException("User already exists.");
		}
		if(userExists != null && userExists.getActive()) {
			userExists.setActive(false);
			userRepository.saveAndFlush(userExists);
			return userMapper.entityToDto(userExists);
		} else {
			userRepository.saveAndFlush(userToCreate);
			return userMapper.entityToDto(userToCreate);
		}
    }
    
    
    
}


