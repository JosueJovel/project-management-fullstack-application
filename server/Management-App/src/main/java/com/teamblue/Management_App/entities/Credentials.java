package com.teamblue.Management_App.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Embeddable
@Data
@NoArgsConstructor
public class Credentials {


    @Column(unique = true)
	@NonNull
    private String username;
	
	@NonNull
    private String password;
}
