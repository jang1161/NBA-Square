package com.nba.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nba.backend.dto.PlayerDto;
import com.nba.backend.dto.StatDto;
import com.nba.backend.service.PlayerService;
import java.util.*;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @GetMapping
    public ResponseEntity<List<PlayerDto>> getAllPlayers(
        @RequestParam(defaultValue = "2024-25") String season) {
        try {
            List<PlayerDto> players = playerService.getAllPlayers(season);
            return ResponseEntity.ok(players);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<PlayerDto>> getPlayersByTeamId(
        @PathVariable Long teamId, 
        @RequestParam(defaultValue = "2024-25") String season) {
        try {
            List<PlayerDto> players = playerService.getPlayersByTeamId(teamId, season);
            return ResponseEntity.ok(players);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> getPlayerInfo(@PathVariable Long id) {
        try {
            PlayerDto player = playerService.getPlayerInfo(id);
            return ResponseEntity.ok(player);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<List<StatDto>> getPlayerStats(@PathVariable Long id) {
        try {
            List<StatDto> stats = playerService.getPlayerStats(id);
            return ResponseEntity.ok(stats);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
