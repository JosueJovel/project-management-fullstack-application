package com.teamblue.Management_App.controllers;

import com.teamblue.Management_App.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/teams")
public class TeamController {
    @Autowired
    private TeamService teamService;

    // TODO: ENDPOINTS

}
