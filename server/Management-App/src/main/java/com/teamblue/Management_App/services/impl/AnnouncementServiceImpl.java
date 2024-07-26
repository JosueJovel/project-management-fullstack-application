package com.teamblue.Management_App.services.impl;

import com.teamblue.Management_App.repositories.AnnouncementsRepository;
import com.teamblue.Management_App.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
    private final AnnouncementsRepository announcementsRepository;
}
