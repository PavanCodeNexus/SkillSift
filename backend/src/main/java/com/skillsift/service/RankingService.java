package com.skillsift.service;

import com.skillsift.client.GroqClient;
import com.skillsift.dto.CourseResult;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RankingService {

    private final GroqClient groqClient;

    public RankingService(GroqClient groqClient) {
        this.groqClient = groqClient;
    }

    public List<CourseResult> rankAndExplain(String query, String level, List<CourseResult> rawCourses) {
        if (rawCourses == null || rawCourses.isEmpty()) {
            return Collections.emptyList();
        }

        // 1. Sort initially by composite score (views + length appropriateness)
        List<CourseResult> sorted = new ArrayList<>(rawCourses);
        sorted.sort((a, b) -> Long.compare(b.getViews() != null ? b.getViews() : 0, a.getViews() != null ? a.getViews() : 0));

        // 2. Select top courses (up to 5 for AI deep ranking)
        int topLimit = Math.min(5, sorted.size());
        List<CourseResult> topCourses = sorted.subList(0, topLimit);

        // 3. Obtain AI explanations
        Map<String, String> reasons = groqClient.rankAndExplain(query, level, topCourses);

        for (CourseResult cr : topCourses) {
            String reason = reasons.get(cr.getVideoId());
            if (reason != null && !reason.isBlank()) {
                cr.setAiReason(reason);
            } else {
                cr.setAiReason("Recommended course tailored for college coursework and concept mastery.");
            }
        }

        return sorted;
    }
}
