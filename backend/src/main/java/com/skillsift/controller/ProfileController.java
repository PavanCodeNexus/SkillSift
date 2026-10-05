package com.skillsift.controller;

import com.skillsift.dto.ProfileDto;
import com.skillsift.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileDto> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        ProfileDto dto = profileService.getProfile(userDetails.getUsername());
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<ProfileDto> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ProfileDto dto) {
        ProfileDto updated = profileService.updateProfile(userDetails.getUsername(), dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/notes/{videoId}")
    public ResponseEntity<Map<String, String>> getNote(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String videoId) {
        String content = profileService.getVideoNote(userDetails.getUsername(), videoId);
        return ResponseEntity.ok(Map.of("noteContent", content));
    }

    @PostMapping("/notes/{videoId}")
    public ResponseEntity<Map<String, String>> saveNote(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String videoId,
            @RequestBody Map<String, String> body) {
        String content = body.getOrDefault("noteContent", "");
        profileService.saveVideoNote(userDetails.getUsername(), videoId, content);
        return ResponseEntity.ok(Map.of("status", "saved"));
    }
}
