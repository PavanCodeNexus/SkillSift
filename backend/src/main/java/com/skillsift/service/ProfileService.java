package com.skillsift.service;

import com.skillsift.dto.ProfileDto;
import com.skillsift.exception.ApiException;
import com.skillsift.model.User;
import com.skillsift.model.VideoNotes;
import com.skillsift.repository.PlaylistRepository;
import com.skillsift.repository.UserRepository;
import com.skillsift.repository.VideoNotesRepository;
import com.skillsift.repository.WatchHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final WatchHistoryRepository watchHistoryRepository;
    private final VideoNotesRepository videoNotesRepository;

    public ProfileService(UserRepository userRepository,
                          PlaylistRepository playlistRepository,
                          WatchHistoryRepository watchHistoryRepository,
                          VideoNotesRepository videoNotesRepository) {
        this.userRepository = userRepository;
        this.playlistRepository = playlistRepository;
        this.watchHistoryRepository = watchHistoryRepository;
        this.videoNotesRepository = videoNotesRepository;
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(404, "User not found"));
    }

    public ProfileDto getProfile(String email) {
        User user = getUserByEmail(email);
        long playlistsCount = playlistRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).size();
        long historyCount = watchHistoryRepository.findByUserIdOrderByWatchedAtDesc(user.getId()).size();

        return new ProfileDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getEducation(),
                user.getCollege(),
                playlistsCount,
                historyCount
        );
    }

    @Transactional
    public ProfileDto updateProfile(String email, ProfileDto dto) {
        User user = getUserByEmail(email);
        user.setName(dto.getName());
        user.setEducation(dto.getEducation());
        user.setCollege(dto.getCollege());
        User updated = userRepository.save(user);

        long playlistsCount = playlistRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).size();
        long historyCount = watchHistoryRepository.findByUserIdOrderByWatchedAtDesc(user.getId()).size();

        return new ProfileDto(
                updated.getId(),
                updated.getName(),
                updated.getEmail(),
                updated.getEducation(),
                updated.getCollege(),
                playlistsCount,
                historyCount
        );
    }

    public String getVideoNote(String email, String videoId) {
        User user = getUserByEmail(email);
        return videoNotesRepository.findByUserIdAndVideoId(user.getId(), videoId)
                .map(VideoNotes::getNoteContent)
                .orElse("");
    }

    @Transactional
    public void saveVideoNote(String email, String videoId, String content) {
        User user = getUserByEmail(email);
        VideoNotes notes = videoNotesRepository.findByUserIdAndVideoId(user.getId(), videoId)
                .orElse(new VideoNotes(user.getId(), videoId, ""));

        notes.setNoteContent(content);
        notes.setUpdatedAt(LocalDateTime.now());
        videoNotesRepository.save(notes);
    }
}
