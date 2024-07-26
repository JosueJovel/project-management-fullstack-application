package com.teamblue.Management_App.controllers;


import java.util.List;

import com.teamblue.Management_App.dtos.*;
import com.teamblue.Management_App.dtos.FullUserDto;
import com.teamblue.Management_App.dtos.UserRequestDto;
import com.teamblue.Management_App.dtos.TeamDto;
import com.teamblue.Management_App.dtos.TeamRequestDto;
import com.teamblue.Management_App.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.teamblue.Management_App.dtos.FullUserDto;
import com.teamblue.Management_App.dtos.ProjectDto;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;


    // TODO: ENDPOINTS
    @GetMapping
    public List<CompanyDto> getAllCompanies(){
    	return companyService.getAllCompanies();
    }
    
    @GetMapping("/{id}")
    public CompanyDto getCompanyById(@PathVariable Long id){
    	return companyService.getCompanyById(id);
    }
    
    @GetMapping("/{id}/announcements")
    public List<AnnouncementDto> getAllCompanyAnnouncements(@PathVariable Long id){
        System.out.println("was called in controller");
    	return companyService.getAllCompanyAnnouncements(id);
    }
    
    @PostMapping("/{id}/announcement")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAnnouncement(@PathVariable Long id, @RequestBody AnnouncementRequestDto announcementRequestDto) {
    	companyService.createAnnouncement(id, announcementRequestDto);
    }


    @GetMapping("/{id}/users")
    public List<FullUserDto> getUsersByCompanyId(@PathVariable long id) {
        return companyService.getUsersByCompanyId(id);
    }

    @GetMapping("/{comp_id}/teams/{team_id}/projects")
    public List<ProjectDto> getCompanyTeamProjects(@PathVariable long comp_id, @PathVariable long team_id){
    	return companyService.getCompanyTeamProjects(comp_id, team_id);
    }

    @PatchMapping("/{companyId}/teams/{teamId}/project")
    public ProjectDto updateProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody ProjectDto projectDto) {
        return companyService.updateProject(companyId, teamId, projectDto);
    }
    @GetMapping("/{id}/teams")
    public List<TeamDto> getTeamsByCompanyId(@PathVariable long id) { //Get Teams using company id path variable
        System.out.println("Made a call to CompanyController");

        //Return List of TeamDto
        return companyService.getTeamsByCompanyId(id);
    }

    @PostMapping("/{id}/user")
    public void createUserByCompanyId(@PathVariable long id, @RequestBody UserRequestDto userRequestDto) {
        System.out.println("A call was made to the controller.");
        companyService.createUserByCompanyId(id, userRequestDto);
    }

    @PostMapping("/{id}/team")
    public TeamDto createTeam(@PathVariable long id, @RequestBody TeamRequestDto newTeam) { //Put new team into DB
        //newTeam is the TeamRequestDto our frontend sends, captured with @RequestBody

        //Return the TeamDto of the Team entity we just saved
        return companyService.createTeam(id, newTeam);

    }

    @PostMapping("/{companyId}/teams/{teamId}/project")
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectDto createProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody ProjectRequestDto projectRequestDto) {
        return companyService.createProject(companyId, teamId, projectRequestDto);
    }
}
