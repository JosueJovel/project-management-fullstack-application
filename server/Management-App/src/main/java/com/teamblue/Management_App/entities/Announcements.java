package com.teamblue.Management_App.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "announcements_table")
@Data
@NoArgsConstructor
public class Announcements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp date;
    private String title;
    private String message;
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
}

