package com.teamblue.Management_App.mappers;

import com.teamblue.Management_App.dtos.ProfileDto;
import com.teamblue.Management_App.entities.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileDto entityToDto(Profile profile);
    Profile dtoToEntity(ProfileDto profileDto);
}
