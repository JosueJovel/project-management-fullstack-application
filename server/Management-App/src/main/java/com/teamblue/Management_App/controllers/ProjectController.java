package com.teamblue.Management_App.controllers;

import java.util.List;

import com.teamblue.Management_App.repositories.ProjectRepository;
import com.teamblue.Management_App.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // TODO: ENDPOINTS

}
