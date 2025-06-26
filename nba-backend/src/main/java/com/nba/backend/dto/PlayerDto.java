package com.nba.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String jersey;
    private String position;
    private String height;
    private String weight;
    private Integer age;
    private Long teamId;
    private String teamName;
    private String teamAbbreviation;
    private String country;
    private String draft;
    private String school;
}
