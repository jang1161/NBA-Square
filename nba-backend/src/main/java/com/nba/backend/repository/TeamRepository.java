package com.nba.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nba.backend.entity.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

}
