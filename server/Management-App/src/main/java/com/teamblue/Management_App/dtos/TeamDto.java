package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDto {
	private Long id;
	private String name;
	private String description;
	private List<BasicUserDto> users;
}
