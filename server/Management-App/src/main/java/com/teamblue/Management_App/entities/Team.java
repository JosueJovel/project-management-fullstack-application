package com.teamblue.Management_App.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "team_table")
@Data
@NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToMany(mappedBy = "teams")
    private List<User> users;

    @OneToMany(mappedBy = "team")
    private List<Project> projects;
}

