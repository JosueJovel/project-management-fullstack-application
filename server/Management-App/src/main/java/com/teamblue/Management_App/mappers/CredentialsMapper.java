package com.teamblue.Management_App.mappers;

import com.teamblue.Management_App.dtos.CredentialsDto;
import com.teamblue.Management_App.entities.Credentials;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CredentialsMapper {
	Credentials requestDtoToEntity (CredentialsDto credentialsDto);
	
	CredentialsDto responseDtoToEntity(Credentials entity);
	

}
