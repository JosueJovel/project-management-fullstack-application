package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
}
