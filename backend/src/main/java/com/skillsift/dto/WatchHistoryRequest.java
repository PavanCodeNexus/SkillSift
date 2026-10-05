package com.skillsift.dto;

import jakarta.validation.constraints.NotBlank;

public class WatchHistoryRequest {

    @NotBlank(message = "Video ID is required")
    private String videoId;

    @NotBlank(message = "Title is required")
    private String title;

    private String thumbnailUrl;

    private String channelTitle;

    public WatchHistoryRequest() {}

    public String getVideoId() { return videoId; }
    public void setVideoId(String videoId) { this.videoId = videoId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getChannelTitle() { return channelTitle; }
    public void setChannelTitle(String channelTitle) { this.channelTitle = channelTitle; }
}
