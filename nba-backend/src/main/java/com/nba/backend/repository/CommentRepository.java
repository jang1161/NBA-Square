package com.nba.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nba.backend.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
    List<Comment> findByPostIdOrderByCreatedAtAsc(Long id);
}
