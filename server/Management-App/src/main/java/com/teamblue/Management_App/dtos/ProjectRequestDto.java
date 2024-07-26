package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequestDto {
    private String name;
    private String description;
    private Boolean active;
    private TeamDto team;
}
