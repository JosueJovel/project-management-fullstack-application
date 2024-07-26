package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    private CredentialsDto credentials;
    private ProfileDto profile;
    private Boolean isAdmin;
}
