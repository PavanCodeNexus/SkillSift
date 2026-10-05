package com.skillsift.dto;

public class CourseResult {

    private String videoId;
    private String title;
    private String channelTitle;
    private Long views;
    private Long durationSeconds;
    private String thumbnailUrl;
    private String level;
    private String language;
    private String aiReason;
    private String publishedAt;

    public CourseResult() {}

    public CourseResult(String videoId, String title, String channelTitle, Long views,
                        Long durationSeconds, String thumbnailUrl, String level,
                        String language, String aiReason, String publishedAt) {
        this.videoId = videoId;
        this.title = title;
        this.channelTitle = channelTitle;
        this.views = views;
        this.durationSeconds = durationSeconds;
        this.thumbnailUrl = thumbnailUrl;
        this.level = level;
        this.language = language;
        this.aiReason = aiReason;
        this.publishedAt = publishedAt;
    }

    public String getVideoId() { return videoId; }
    public void setVideoId(String videoId) { this.videoId = videoId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getChannelTitle() { return channelTitle; }
    public void setChannelTitle(String channelTitle) { this.channelTitle = channelTitle; }

    public Long getViews() { return views; }
    public void setViews(Long views) { this.views = views; }

    public Long getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Long durationSeconds) { this.durationSeconds = durationSeconds; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getAiReason() { return aiReason; }
    public void setAiReason(String aiReason) { this.aiReason = aiReason; }

    public String getPublishedAt() { return publishedAt; }
    public void setPublishedAt(String publishedAt) { this.publishedAt = publishedAt; }
}
