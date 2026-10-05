package com.skillsift.repository;

import com.skillsift.model.PlaylistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaylistItemRepository extends JpaRepository<PlaylistItem, Long> {
    List<PlaylistItem> findByPlaylistIdOrderByAddedAtDesc(Long playlistId);
    Optional<PlaylistItem> findByPlaylistIdAndVideoId(Long playlistId, String videoId);
}
