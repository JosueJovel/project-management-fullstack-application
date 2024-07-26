package com.teamblue.Management_App.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
	private Long id;
	private String name;
	private String description;
	private List<TeamDto> teams;
	private List<BasicUserDto> users;
}
