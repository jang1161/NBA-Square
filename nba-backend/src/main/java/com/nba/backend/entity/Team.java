package com.nba.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "teams")
public class Team {
    @Id
    private Long id;

    private String conference;
    private String division;
    private String city;
    private String name;

    @Column(name = "full_name")
    private String fullName;

    private String abbreviation;
}