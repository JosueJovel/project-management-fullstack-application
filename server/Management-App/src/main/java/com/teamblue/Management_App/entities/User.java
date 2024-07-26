package com.teamblue.Management_App.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.Set;


@Entity
@Table(name = "user_table")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Credentials credentials;
    
    @Embedded
    private Profile profile;
    
    private Boolean active;
    private Boolean isAdmin;
    private String status;

    @OneToMany(mappedBy = "author")
    @ToString.Exclude
    private List<Announcements> announcements;

    @ManyToMany
    @ToString.Exclude
    @JoinTable(
            name = "user_company_table",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "company_id")
    )
    private List<Company> companies;

    @ManyToMany
    @ToString.Exclude
    @JoinTable(
            name = "user_team_table",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    private List<Team> teams;
}

