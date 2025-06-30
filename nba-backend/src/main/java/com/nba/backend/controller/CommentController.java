package com.nba.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nba.backend.dto.CommentDto;
import com.nba.backend.service.CommentService;

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
}
