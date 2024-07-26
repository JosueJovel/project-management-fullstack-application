package com.teamblue.Management_App.entities;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Embeddable
@Data
@NoArgsConstructor
public class Profile {
	private String firstname;
	private String lastname;
	private String email;
	private String phone;
}
