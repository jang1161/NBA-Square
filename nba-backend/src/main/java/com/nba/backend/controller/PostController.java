package com.nba.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nba.backend.dto.PostDto;
import com.nba.backend.service.PostService;

import io.jsonwebtoken.JwtException;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public List<PostDto> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping("/create")
    public PostDto createPost(@RequestBody PostDto post) {
        return postService.createPost(post);
    }

    @GetMapping("/{id}")
    public PostDto getPost(@PathVariable Long id) {
        return postService.getPost(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(
        @PathVariable Long id,
        @RequestHeader("Authorization") String header) {
        System.out.println("헤더: " + header);
        
        if(header == null || !header.startsWith("Bearer ")) {
            System.out.println("헤더가 null이거나 Bearer값 X");
            return ResponseEntity.status(401).body("인증 토큰이 없습니다.");
        }
        String token = header.substring(7); // "Bearer " 삭제
        System.out.println("token: " + token);

        try {
            postService.deletePost(id, token);
            return ResponseEntity.ok("삭제 성공");
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        } catch(JwtException e) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
        }
    }
}
