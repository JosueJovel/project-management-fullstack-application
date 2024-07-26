package com.teamblue.Management_App.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Long id;
    private String name;
    private String description;
    private Boolean active;
    private TeamDto team;
}
