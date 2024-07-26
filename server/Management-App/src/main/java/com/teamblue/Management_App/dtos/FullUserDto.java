package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FullUserDto {
	private Long id;
	private ProfileDto profile;
	private Boolean isAdmin;
	private Boolean active;
	private String status;
	private List<CompanyDto> companies;
	private List<TeamDto> teams;
}
