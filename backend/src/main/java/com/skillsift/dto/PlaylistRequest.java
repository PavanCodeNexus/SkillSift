package com.skillsift.dto;

import jakarta.validation.constraints.NotBlank;

public class PlaylistRequest {

    @NotBlank(message = "Playlist name is required")
    private String name;

    public PlaylistRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
