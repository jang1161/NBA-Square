package com.nba.backend.service;

import com.nba.backend.entity.Team;
import com.nba.backend.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeamById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("팀 정보를 찾을 수 없습니다. id=" + id));
    }

    public List<Team> findAllTeams() {
        return teamRepository.findAll();
    }
}
