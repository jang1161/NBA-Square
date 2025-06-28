package com.nba.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nba.backend.dto.PostDto;
import com.nba.backend.entity.Post;
import com.nba.backend.repository.PostRepository;
import com.nba.backend.util.JwtUtil;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private JwtUtil jwtUtil;

    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostDto> dtos = posts.stream()
            .map(PostDto::from)
            .collect(Collectors.toList());    
        return dtos;
    }

    public PostDto createPost(PostDto dto) {
        Post post = dto.toEntity();
        Post saved = postRepository.save(post);
        return PostDto.from(saved);
    }

    public PostDto getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
            () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        return PostDto.from(post);
    }

    public void deletePost(Long id, String token) {
        System.out.println("Inside deletePost");
        Post post = postRepository.findById(id).orElseThrow(
            () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        
        Long userId = jwtUtil.getUserId(token);
        System.out.println("userId: " + userId);
        System.out.println("authroId: " + post.getAuthorId());
        
        if(userId != post.getAuthorId())
            throw new IllegalArgumentException("삭제 권한이 없습니다.");

        postRepository.deleteById(id);
    }

}
