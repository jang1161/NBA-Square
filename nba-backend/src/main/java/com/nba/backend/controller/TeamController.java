package com.nba.backend.controller;

import com.nba.backend.dto.TeamDto;
import com.nba.backend.entity.Team;
import com.nba.backend.service.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<List<TeamDto>> getAllTeams() {
        List<Team> teams = teamService.findAllTeams();
        List<TeamDto> result = teams.stream()
                .map(TeamDto::fromEntity)
                .toList();
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getTeamById(@PathVariable Long id) {
        try {
            Team team = teamService.getTeamById(id);
            return ResponseEntity.ok(team);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
