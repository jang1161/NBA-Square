package com.nba.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nba.backend.dto.CommentDto;
import com.nba.backend.entity.Comment;
import com.nba.backend.repository.CommentRepository;
import com.nba.backend.repository.PostRepository;
import com.nba.backend.util.JwtUtil;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CommentService {
    @Autowired 
    CommentRepository commentRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    JwtUtil jwtUtil;

    public CommentDto create(CommentDto dto) {
        Comment comment = dto.toEntity();
        Comment saved = commentRepository.save(comment);
        return CommentDto.from(saved);
    }

    public List<CommentDto> getComments(Long postId) {
        if(!postRepository.existsById(postId))
            throw new EntityNotFoundException("게시글을 찾을 수 없습니다. id=" + postId);

        List<Comment> comments = commentRepository.findByPostIdOrderByCreatedAtAsc(postId);
        List<CommentDto> dtos = comments.stream()
            .map(CommentDto::from)
            .collect(Collectors.toList());    
        return dtos;
    }

    public void deleteComment(Long id, String token) {
        Comment comment = commentRepository.findById(id).orElseThrow(
            () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다." + id));

        Long userId = jwtUtil.getUserId(token);
        if(userId != comment.getAuthorId())
            throw new IllegalArgumentException("삭제 권한이 없습니다.");

        commentRepository.deleteById(id);
    }
}
