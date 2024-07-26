package com.teamblue.Management_App.dtos;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementDto {
    private Long id;
    private Timestamp date;
    private String title;
    private String message;
    private BasicUserDto author;
}
