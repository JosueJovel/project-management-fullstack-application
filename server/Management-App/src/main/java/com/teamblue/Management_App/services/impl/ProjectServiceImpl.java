package com.teamblue.Management_App.services.impl;

import com.teamblue.Management_App.repositories.ProjectRepository;
import com.teamblue.Management_App.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
}
