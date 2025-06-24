package com.nba.backend.repository;

import com.nba.backend.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    // 기본 CRUD 메서드 자동 제공
}
