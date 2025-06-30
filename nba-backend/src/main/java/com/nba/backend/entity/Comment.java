package com.nba.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "comments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long postId;
    private Long authorId;
    private String authorName;
    private String content;
    
    @CreatedDate
    private LocalDateTime createdAt;

    public Comment(Long postId, Long authorId, String authorName, String content) {
        this.postId = postId;
        this.authorId = authorId;
        this.authorName = authorName;
        this.content = content;
    }
}
