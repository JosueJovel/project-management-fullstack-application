package com.teamblue.Management_App.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "project_table")
@Data
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}

