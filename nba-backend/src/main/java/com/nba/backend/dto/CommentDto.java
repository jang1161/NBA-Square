package com.nba.backend.dto;

import java.time.LocalDateTime;

import com.nba.backend.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private Long postId;
    private Long authorId;
    private String authorName;
    private String content;
    private LocalDateTime createdAt;

    public Comment toEntity() {
        Comment comment = new Comment();
        comment.setPostId(this.postId);
        comment.setAuthorId(this.authorId);
        comment.setAuthorName(this.authorName);
        comment.setContent(this.content);
        return comment;
    }

    public static CommentDto from(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setAuthorName(comment.getAuthorName());
        commentDto.setContent(comment.getContent());
        commentDto.setCreatedAt(comment.getCreatedAt());
        return commentDto;
    }
}