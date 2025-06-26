package com.nba.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nba.backend.dto.PlayerDto;
import com.nba.backend.service.PlayerService;
import java.util.*;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @GetMapping("/{teamId}")
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
}
