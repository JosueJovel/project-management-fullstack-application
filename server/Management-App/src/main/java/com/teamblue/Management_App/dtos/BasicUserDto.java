package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicUserDto {
	private Long id;
	private ProfileDto profile;
	private Boolean isAdmin;
	private Boolean active;
	private String status;
}
