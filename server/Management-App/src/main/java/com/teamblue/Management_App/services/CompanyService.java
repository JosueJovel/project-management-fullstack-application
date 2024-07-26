package com.teamblue.Management_App.services;

import com.teamblue.Management_App.dtos.*;
import java.util.List;

import com.teamblue.Management_App.dtos.FullUserDto;
import com.teamblue.Management_App.dtos.UserRequestDto;
import com.teamblue.Management_App.dtos.TeamDto;
import com.teamblue.Management_App.dtos.TeamRequestDto;

public interface CompanyService {
    List<FullUserDto> getActiveUsersByCompanyId(Long companyId);
	void createAnnouncement(Long id, AnnouncementRequestDto announcementRequestDto);
	List<AnnouncementDto> getAllCompanyAnnouncements(Long id);
	List<CompanyDto> getAllCompanies();
    List<FullUserDto> getUsersByCompanyId(long id);
	List<ProjectDto> getCompanyTeamProjects(long comp_id, long team_id);
	CompanyDto getCompanyById(Long id);
    void createUserByCompanyId(long id, UserRequestDto userRequestDto);
	List<TeamDto> getTeamsByCompanyId(long id); //New method to grab a teams of a company
    TeamDto createTeam(long id, TeamRequestDto newTeam);
    ProjectDto updateProject(Long companyId, Long teamId, ProjectDto projectDto);

    ProjectDto createProject(Long companyId, Long teamId, ProjectRequestDto projectRequestDto);
}


