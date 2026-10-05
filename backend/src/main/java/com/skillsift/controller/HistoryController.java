package com.skillsift.controller;

import com.skillsift.dto.WatchHistoryRequest;
import com.skillsift.model.WatchHistory;
import com.skillsift.service.HistoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<WatchHistory>> getHistory(@AuthenticationPrincipal UserDetails userDetails) {
        List<WatchHistory> history = historyService.getUserHistory(userDetails.getUsername());
        return ResponseEntity.ok(history);
    }

    @PostMapping
    public ResponseEntity<WatchHistory> recordWatch(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody WatchHistoryRequest request) {
        WatchHistory entry = historyService.recordWatch(userDetails.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(entry);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearHistory(@AuthenticationPrincipal UserDetails userDetails) {
        historyService.clearHistory(userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
