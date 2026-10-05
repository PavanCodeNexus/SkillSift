package com.skillsift.repository;

import com.skillsift.model.VideoNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoNotesRepository extends JpaRepository<VideoNotes, Long> {
    Optional<VideoNotes> findByUserIdAndVideoId(Long userId, String videoId);
}
