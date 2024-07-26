package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementRequestDto {
	private String title;
    private String message;
    private BasicUserDto author;
}
