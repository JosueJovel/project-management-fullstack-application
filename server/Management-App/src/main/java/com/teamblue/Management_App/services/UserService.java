package com.teamblue.Management_App.services;

import java.util.List;

import com.teamblue.Management_App.dtos.BasicUserDto;
import com.teamblue.Management_App.dtos.CredentialsDto;
import com.teamblue.Management_App.dtos.FullUserDto;
import com.teamblue.Management_App.dtos.UserRequestDto;
import com.teamblue.Management_App.entities.Credentials;

public interface UserService {
    public FullUserDto login(CredentialsDto credentialsDto);

	public List<BasicUserDto> getAllUsers();

	public FullUserDto createUser(UserRequestDto userRequestDto);
}
