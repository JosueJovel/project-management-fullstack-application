package com.teamblue.Management_App.mappers;

import com.teamblue.Management_App.dtos.ProjectDto;
import com.teamblue.Management_App.dtos.ProjectRequestDto;
import com.teamblue.Management_App.entities.Project;

import java.util.List;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public interface ProjectMapper {
    ProjectDto entityToDto(Project project);
    Project dtoToEntity(ProjectDto projectDto);
	List<ProjectDto> entitiesToDtos(List<Project> projects);
    Project requestDtoToEntity(ProjectRequestDto projectRequestDto);
}

