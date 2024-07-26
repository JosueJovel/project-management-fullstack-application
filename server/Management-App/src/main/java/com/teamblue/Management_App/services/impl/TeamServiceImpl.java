package com.teamblue.Management_App.services.impl;

import com.teamblue.Management_App.repositories.TeamRepository;
import com.teamblue.Management_App.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
}
