package com.nba.backend.dto;

import com.nba.backend.entity.Team;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {
    private Long id;
    private String conference;
    private String division;
    private String city;
    private String name;
    private String full_name;
    private String abbreviation;

    public static TeamDto fromEntity(Team team) {
        TeamDto dto = new TeamDto();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setFull_name(team.getFullName());
        dto.setCity(team.getCity());
        dto.setAbbreviation(team.getAbbreviation());
        dto.setConference(team.getConference());
        dto.setDivision(team.getDivision());

        return dto;
    }
}