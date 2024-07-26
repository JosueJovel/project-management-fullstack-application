package com.teamblue.Management_App.mappers;

import java.util.List;

import com.teamblue.Management_App.dtos.BasicUserDto;
import com.teamblue.Management_App.dtos.FullUserDto;
import com.teamblue.Management_App.dtos.UserRequestDto;
import com.teamblue.Management_App.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {


    FullUserDto entityToDto(User entity);

	User requestDtoToEntity(UserRequestDto userRequestDto);

	List<BasicUserDto> entitiesToBasicUserDtos(List<User> entities);

	User fullUserDtoToEntity(FullUserDto fullUserDto);

    BasicUserDto entityToBasicDto(User user);
    
    User basicUserDtoToEntity(BasicUserDto basicUserDto);

    List<FullUserDto> entitiesToFullUserDtos(List<User> entities);

    User UserRequestDtoToEntity(UserRequestDto userRequestDto);
}
