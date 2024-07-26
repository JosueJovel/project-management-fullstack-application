package com.teamblue.Management_App.services.impl;


import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.teamblue.Management_App.dtos.*;
import com.teamblue.Management_App.exceptions.BadRequestException;
import org.springframework.stereotype.Service;

import com.teamblue.Management_App.entities.Announcements;
import com.teamblue.Management_App.entities.Company;
import com.teamblue.Management_App.entities.Project;
import com.teamblue.Management_App.entities.Team;
import com.teamblue.Management_App.entities.User;
import com.teamblue.Management_App.mappers.AnnouncementMapper;
import com.teamblue.Management_App.mappers.CompanyMapper;
import com.teamblue.Management_App.mappers.ProjectMapper;
import com.teamblue.Management_App.mappers.TeamMapper;
import com.teamblue.Management_App.mappers.UserMapper;
import com.teamblue.Management_App.repositories.AnnouncementsRepository;
import com.teamblue.Management_App.repositories.CompanyRepository;
import com.teamblue.Management_App.repositories.ProjectRepository;
import com.teamblue.Management_App.repositories.TeamRepository;
import com.teamblue.Management_App.repositories.UserRepository;
import com.teamblue.Management_App.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AnnouncementMapper announcementMapper;
    private final AnnouncementsRepository announcementRepository;
    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;


    @Override
    public List<FullUserDto> getActiveUsersByCompanyId(Long companyId) {
        // Retrieve the company by its ID or throw an exception if not found
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        // Get all users from all teams associated with the company
        List<User> users = company.getTeams().stream()
                .flatMap(team -> team.getUsers().stream())
                .filter(User::getActive) // Filter out inactive users
                .toList();

        // Convert the list of User entities to a list of FullUserDto objects
        return users.stream()
                .map(user -> {
                    // Map the User entity to FullUserDto
                    FullUserDto dto = userMapper.entityToDto(user);
                    // Set the companies field to an empty list
                    dto.setCompanies(List.of());
                    return dto;
                })
                .collect(Collectors.toList());
    }
  
    @Override
    public List<FullUserDto> getUsersByCompanyId(long id) {
        System.out.println("Made a call to CompanyServiceImpl");
        return userMapper.entitiesToFullUserDtos(userRepository.findUsersByCompanyId(id));
    }
    
    @Override
    public CompanyDto getCompanyById(Long id) {
    	Company company = companyRepository.findById(id)
    			.orElseThrow(() -> new IllegalArgumentException("Company not found"));
    	return companyMapper.entityToDto(company) ;
    }

//TODO - fix method
    @Override
    public List<AnnouncementDto> getAllCompanyAnnouncements(Long id){
        System.out.println("was called in service");
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
        System.out.println("service did not throw error - company: " + company);
        List<Announcements> announcements = announcementRepository.findAnnouncementsByCompanyId(company.getId());
        return announcementMapper.entitiesToDtos(announcements);

    }

    @Override
    public List<CompanyDto> getAllCompanies(){
        return companyMapper.dtosToEntities(companyRepository.findAll());
    }


    @Override
    public void createAnnouncement(Long id, AnnouncementRequestDto announcementRequestDto) {
        Company company = companyRepository.getReferenceById(id);
        Announcements announcements = announcementMapper.dtoToEntity(announcementRequestDto);
        announcements.setCompany(company);
        announcements.setDate(Timestamp.valueOf(LocalDateTime.now()));
        announcementRepository.saveAndFlush(announcements);

//        // Find company by id
//        Company company = companyRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
//        // Create new announcement object
//        Announcements announce = announcementMapper.dtoToEntity(announcementRequestDto);
//        announce.setCompany(company);
//        announce.setIsDeleted(false);
//
//        // Set the author from the user repository
//        User author = userRepository.findById(announcementRequestDto.getAuthor().getId())
//                .orElseThrow(() -> new IllegalArgumentException("Author not found"));
//        announce.setAuthor(author);
//
//        System.out.println("Announcement: " + announce);
//        // Update and Save Company
//        List<Announcements> companyAnnouncements = company.getAnnouncements();
//        companyAnnouncements.add(announce);
//        company.setAnnouncements(companyAnnouncements);
//        companyRepository.saveAndFlush(company);
//
//        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announce));
    }
    
    public List<ProjectDto> getCompanyTeamProjects(long comp_id, long team_id){
    	Company company = companyRepository.findById(comp_id); //Because findById was manually defined, can no longer use .orElseThrow
                // .orElseThrow(() -> new IllegalArgumentException("Company not found"));
        Team team = teamRepository.findById(team_id)
        		.orElseThrow(() -> new IllegalArgumentException("Team not found"));
        
        System.out.println();
        
    	return projectMapper.entitiesToDtos(team.getProjects());
    }
    @Override
    public ProjectDto updateProject(Long companyId, Long teamId, ProjectDto projectDto) {
        // find company by ID
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new IllegalArgumentException("Company not found"));
        // find team by ID
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new IllegalArgumentException("Team not found"));

        // Ensure the team belongs to the company
        if (!company.getTeams().contains(team)) {
            throw new IllegalArgumentException("Team does not belong to the company");
        }

        // find project by id
        Project project = projectRepository.findById(projectDto.getId()).orElseThrow(() -> new IllegalArgumentException("Project not found"));

        // Ensure the project belongs to the team
        if (!team.getProjects().contains(project)) {
            throw new IllegalArgumentException("Project does not belong to the team");
        }

        // Update the project entity with the new details
        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
        project.setActive(projectDto.getActive());

        // Save the updated project
        Project updatedProject = projectRepository.saveAndFlush(project);

        // Convert the updated project entity to ProjectDto
        return projectMapper.entityToDto(updatedProject);

    }


    @Override
    public void createUserByCompanyId(long id, UserRequestDto userRequestDto) {
        User newUser = userMapper.UserRequestDtoToEntity(userRequestDto);
        newUser.setCompanies(List.of(companyRepository.findById(id)));
        newUser.setStatus("JOINED");
        newUser.setActive(true);
        for (User user: userRepository.findUsersByCompanyId(id)) {
            System.out.println("username: " + user.getCredentials().getUsername());
            if (user.getCredentials().getUsername().equals(newUser.getCredentials().getUsername())) {
                throw new BadRequestException("User already exists.");
            }
        }
        userRepository.saveAndFlush(newUser);
    }

	@Override
	public List<TeamDto> getTeamsByCompanyId(long id) { //Service method to get a company's teams
		//Return a List of TeamDto, which is grabbed from the database, using JPA DerivedQuery
		return teamMapper.entitiesToDtos(teamRepository.findTeamsByCompanyId(id));
	}

    @Override
    public TeamDto createTeam(long companyId, TeamRequestDto newTeam) {
        //First, create a Team entity with TeamRequestDto
        Team newTeamEntity = teamMapper.RequestDtoToEntity(newTeam);

        //Second: Flesh out Entity by assigning it a Company entity
        Company teamCompany = companyRepository.findById(companyId); //Get the company via the ID
        newTeamEntity.setCompany(teamCompany); //Set the company to this entity to establish the relationship

        List<String> teamNames = new ArrayList<>();
        for (Team team: teamRepository.findTeamsByCompanyId(teamCompany.getId())) {
            teamNames.add(team.getName());
        }

        if (teamNames.contains(newTeamEntity.getName())) {
            throw new BadRequestException("Team name already used.");
        }

        //Third, Save entity into the DB (relationships established with Users should also be reflected)
        Team savedTeam = teamRepository.saveAndFlush(newTeamEntity);

        //Fourth, establish relationships for each employee by assigning each one with the current team and save
        for (User newTeammember : newTeamEntity.getUsers()) { //For every user in the new team
            //Fetch that user from the DB, and assign it a team, then save it.
            User dbTeamMember = userRepository.findById(newTeammember.getId()).get();
            dbTeamMember.getTeams().add(savedTeam);
            userRepository.saveAndFlush(dbTeamMember);
        }


        return teamMapper.entityToDto(savedTeam);//Return the TeamDto we just pushed up (it will now include the ID)
    }

    @Override
    public ProjectDto createProject(Long companyId, Long teamId, ProjectRequestDto projectRequestDto) {
        // find company by ID
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new IllegalArgumentException("Company not found"));
        // Find team by ID
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new IllegalArgumentException("Team not found"));

        // make sure team belongs to the company
        if (!company.getTeams().contains(team)) { throw new IllegalArgumentException("Team does not belong to the company"); }

        // map requestDto to Project entity
        Project project = projectMapper.requestDtoToEntity(projectRequestDto);
        project.setTeam(team);

        // save project
        Project savedProject = projectRepository.saveAndFlush(project);
        // convert new project entity to ProjectDto for frontend
        return projectMapper.entityToDto(savedProject);
    }
}