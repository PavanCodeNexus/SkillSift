package com.skillsift.service;

import com.skillsift.dto.PlaylistItemRequest;
import com.skillsift.dto.PlaylistRequest;
import com.skillsift.exception.ApiException;
import com.skillsift.model.Playlist;
import com.skillsift.model.PlaylistItem;
import com.skillsift.model.User;
import com.skillsift.repository.PlaylistItemRepository;
import com.skillsift.repository.PlaylistRepository;
import com.skillsift.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final PlaylistItemRepository playlistItemRepository;
    private final UserRepository userRepository;

    public PlaylistService(PlaylistRepository playlistRepository,
                           PlaylistItemRepository playlistItemRepository,
                           UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.playlistItemRepository = playlistItemRepository;
        this.userRepository = userRepository;
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(404, "User not found"));
    }

    public List<Playlist> getUserPlaylists(String email) {
        User user = getUserByEmail(email);
        List<Playlist> playlists = playlistRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        for (Playlist p : playlists) {
            p.setItems(playlistItemRepository.findByPlaylistIdOrderByAddedAtDesc(p.getId()));
        }
        return playlists;
    }

    @Transactional
    public Playlist createPlaylist(String email, PlaylistRequest request) {
        User user = getUserByEmail(email);
        Playlist playlist = new Playlist(user.getId(), request.getName());
        return playlistRepository.save(playlist);
    }

    @Transactional
    public PlaylistItem addItem(String email, Long playlistId, PlaylistItemRequest request) {
        User user = getUserByEmail(email);
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ApiException(404, "Playlist not found"));

        if (!playlist.getUserId().equals(user.getId())) {
            throw new ApiException(403, "Access denied to this playlist");
        }

        // Avoid exact duplicate in same playlist
        if (playlistItemRepository.findByPlaylistIdAndVideoId(playlistId, request.getVideoId()).isPresent()) {
            throw new ApiException(400, "Course is already in this playlist");
        }

        PlaylistItem item = new PlaylistItem(
                playlist,
                request.getVideoId(),
                request.getTitle(),
                request.getThumbnailUrl(),
                request.getChannelTitle()
        );

        return playlistItemRepository.save(item);
    }

    @Transactional
    public void removeItem(String email, Long playlistId, Long itemId) {
        User user = getUserByEmail(email);
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ApiException(404, "Playlist not found"));

        if (!playlist.getUserId().equals(user.getId())) {
            throw new ApiException(403, "Access denied to this playlist");
        }

        PlaylistItem item = playlistItemRepository.findById(itemId)
                .orElseThrow(() -> new ApiException(404, "Item not found"));

        playlistItemRepository.delete(item);
    }
}
