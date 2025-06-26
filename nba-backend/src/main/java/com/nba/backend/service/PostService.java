package com.nba.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nba.backend.dto.PostResponseDto;
import com.nba.backend.entity.Post;
import com.nba.backend.repository.PostRepository;
import com.nba.backend.repository.PostRequestDto;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<PostResponseDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostResponseDto> dtos = posts.stream()
            .map(PostResponseDto::from)
            .collect(Collectors.toList());    
        return dtos;
    }

    public PostResponseDto createPost(PostRequestDto dto) {
        Post post = dto.toEntity();
        Post saved = postRepository.save(post);
        return PostResponseDto.from(saved);
    }

    public PostResponseDto getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
            () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        return PostResponseDto.from(post);
    }

}
