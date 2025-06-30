package com.nba.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nba.backend.dto.CommentDto;
import com.nba.backend.service.CommentService;

import io.jsonwebtoken.JwtException;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("/create")
    public CommentDto createComment(@RequestBody CommentDto dto) {
        return commentService.create(dto); // name, content, createdat
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getComments(@PathVariable Long postId) {
        try {
            List<CommentDto> commentDtos = commentService.getComments(postId);
            return ResponseEntity.ok(commentDtos);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long id,
            @RequestHeader("Authorization") String header) {

        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("인증 토큰이 없습니다.");
        }
        String token = header.substring(7);

        try {
            commentService.deleteComment(id, token);
            return ResponseEntity.ok("삭제 성공");
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        } catch(JwtException e) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
        }
    }
}
