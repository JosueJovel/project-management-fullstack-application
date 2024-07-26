package com.teamblue.Management_App.mappers;

import com.teamblue.Management_App.dtos.CompanyDto;
import com.teamblue.Management_App.entities.Company;

import java.util.List;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyDto entityToDto(Company company);
    Company dtoToEntity(CompanyDto companyDto);
	List<CompanyDto> dtosToEntities(List<Company> all);
}
