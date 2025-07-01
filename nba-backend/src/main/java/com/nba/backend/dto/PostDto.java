package com.nba.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.nba.backend.entity.Post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private String authorName;
    private Long authorId;
    private List<String> tags;
    private LocalDateTime createdAt;

    public Post toEntity() {
        Post post = new Post();
        post.setTitle(this.title);
        post.setContent(this.content);
        post.setAuthorName(this.authorName);
        post.setAuthorId(this.authorId);
        return post;
    }

    public static PostDto from(Post post) {
        return new PostDto(
            post.getId(),
            post.getTitle(),
            post.getContent(),
            post.getAuthorName(),
            post.getAuthorId(),
            post.getTags(),
            post.getCreatedAt()
        );
    }
}
