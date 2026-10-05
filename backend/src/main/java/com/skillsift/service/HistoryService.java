package com.skillsift.service;

import com.skillsift.dto.WatchHistoryRequest;
import com.skillsift.exception.ApiException;
import com.skillsift.model.User;
import com.skillsift.model.WatchHistory;
import com.skillsift.repository.UserRepository;
import com.skillsift.repository.WatchHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HistoryService {

    private final WatchHistoryRepository watchHistoryRepository;
    private final UserRepository userRepository;

    public HistoryService(WatchHistoryRepository watchHistoryRepository, UserRepository userRepository) {
        this.watchHistoryRepository = watchHistoryRepository;
        this.userRepository = userRepository;
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(404, "User not found"));
    }

    public List<WatchHistory> getUserHistory(String email) {
        User user = getUserByEmail(email);
        return watchHistoryRepository.findByUserIdOrderByWatchedAtDesc(user.getId());
    }

    @Transactional
    public WatchHistory recordWatch(String email, WatchHistoryRequest request) {
        User user = getUserByEmail(email);
        WatchHistory history = new WatchHistory(
                user.getId(),
                request.getVideoId(),
                request.getTitle(),
                request.getThumbnailUrl(),
                request.getChannelTitle()
        );
        return watchHistoryRepository.save(history);
    }

    @Transactional
    public void clearHistory(String email) {
        User user = getUserByEmail(email);
        watchHistoryRepository.deleteByUserId(user.getId());
    }
}
