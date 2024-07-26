package com.teamblue.Management_App.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "company_table")
@Data
@NoArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "company")
    @ToString.Exclude
    private List<Announcements> announcements;

    @OneToMany(mappedBy = "company")
    @ToString.Exclude
    private List<Team> teams;

    @ManyToMany(mappedBy = "companies") //We use this field to allow mapping between hashtags and tweets in a many to many relationship
    private List<User> users = new ArrayList<>();
}

