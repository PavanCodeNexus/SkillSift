package com.skillsift.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "watch_history")
public class WatchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "video_id")
    private String videoId;

    @Column(nullable = false)
    private String title;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "channel_title")
    private String channelTitle;

    @Column(name = "watched_at")
    private LocalDateTime watchedAt = LocalDateTime.now();

    public WatchHistory() {}

    public WatchHistory(Long userId, String videoId, String title, String thumbnailUrl, String channelTitle) {
        this.userId = userId;
        this.videoId = videoId;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.channelTitle = channelTitle;
        this.watchedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getVideoId() { return videoId; }
    public void setVideoId(String videoId) { this.videoId = videoId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getChannelTitle() { return channelTitle; }
    public void setChannelTitle(String channelTitle) { this.channelTitle = channelTitle; }

    public LocalDateTime getWatchedAt() { return watchedAt; }
    public void setWatchedAt(LocalDateTime watchedAt) { this.watchedAt = watchedAt; }
}
