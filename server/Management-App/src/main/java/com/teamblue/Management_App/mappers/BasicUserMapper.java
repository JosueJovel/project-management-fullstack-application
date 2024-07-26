package com.teamblue.Management_App.mappers;

import com.teamblue.Management_App.dtos.BasicUserDto;
import com.teamblue.Management_App.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ProfileMapper.class})
public interface BasicUserMapper {
    @Mapping(source = "profile", target = "profile")
    BasicUserDto userToBasicUserDto(User user);
}

