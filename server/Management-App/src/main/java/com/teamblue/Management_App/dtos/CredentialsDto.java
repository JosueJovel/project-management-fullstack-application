package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CredentialsDto {
    private String username;
    private String password;
}
