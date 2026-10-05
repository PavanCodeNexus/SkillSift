package com.skillsift.dto;

import jakarta.validation.constraints.NotBlank;

public class ProfileDto {

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    private String email;

    private String education;

    private String college;

    private long playlistCount;

    private long historyCount;

    public ProfileDto() {}

    public ProfileDto(Long id, String name, String email, String education, String college, long playlistCount, long historyCount) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.education = education;
        this.college = college;
        this.playlistCount = playlistCount;
        this.historyCount = historyCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public long getPlaylistCount() { return playlistCount; }
    public void setPlaylistCount(long playlistCount) { this.playlistCount = playlistCount; }

    public long getHistoryCount() { return historyCount; }
    public void setHistoryCount(long historyCount) { this.historyCount = historyCount; }
}
