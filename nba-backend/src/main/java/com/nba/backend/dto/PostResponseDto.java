package com.nba.backend.dto;

import java.time.LocalDateTime;

import com.nba.backend.entity.Post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;

    public static PostResponseDto from(Post post) {
        return new PostResponseDto(
            post.getId(),
            post.getTitle(),
            post.getContent(),
            post.getAuthor(),
            post.getCreatedAt()
        );
    }
}
