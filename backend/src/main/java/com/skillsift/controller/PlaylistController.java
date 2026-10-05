package com.skillsift.controller;

import com.skillsift.dto.PlaylistItemRequest;
import com.skillsift.dto.PlaylistRequest;
import com.skillsift.model.Playlist;
import com.skillsift.model.PlaylistItem;
import com.skillsift.service.PlaylistService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping
    public ResponseEntity<List<Playlist>> getPlaylists(@AuthenticationPrincipal UserDetails userDetails) {
        List<Playlist> playlists = playlistService.getUserPlaylists(userDetails.getUsername());
        return ResponseEntity.ok(playlists);
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody PlaylistRequest request) {
        Playlist playlist = playlistService.createPlaylist(userDetails.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(playlist);
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<PlaylistItem> addItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody PlaylistItemRequest request) {
        PlaylistItem item = playlistService.addItem(userDetails.getUsername(), id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @DeleteMapping("/{id}/items/{itemId}")
    public ResponseEntity<Void> removeItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @PathVariable Long itemId) {
        playlistService.removeItem(userDetails.getUsername(), id, itemId);
        return ResponseEntity.noContent().build();
    }
}
