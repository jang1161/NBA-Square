package com.nba.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nba.backend.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
}
