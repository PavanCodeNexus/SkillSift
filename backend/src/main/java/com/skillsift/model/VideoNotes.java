package com.skillsift.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "video_notes")
public class VideoNotes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "video_id")
    private String videoId;

    @Column(columnDefinition = "TEXT")
    private String noteContent;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public VideoNotes() {}

    public VideoNotes(Long userId, String videoId, String noteContent) {
        this.userId = userId;
        this.videoId = videoId;
        this.noteContent = noteContent;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getVideoId() { return videoId; }
    public void setVideoId(String videoId) { this.videoId = videoId; }

    public String getNoteContent() { return noteContent; }
    public void setNoteContent(String noteContent) { this.noteContent = noteContent; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
