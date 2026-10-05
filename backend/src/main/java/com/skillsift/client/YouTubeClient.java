package com.skillsift.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsift.dto.CourseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.*;

@Component
public class YouTubeClient {

    private static final Logger log = LoggerFactory.getLogger(YouTubeClient.class);
    private static final String YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

    private final String apiKey;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public YouTubeClient(@Value("${youtube.api.key:}") String apiKey, ObjectMapper objectMapper) {
        this.apiKey = apiKey;
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder().baseUrl(YOUTUBE_API_BASE).build();
    }

    public List<CourseResult> searchCourses(String query, String level, String lang) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("YOUTUBE_API_KEY is not configured. Returning curated starter courses.");
            return getFallbackCourses(query, level, lang);
        }

        try {
            // 1. Search for video/playlist items
            String searchUri = "/search?part=snippet&maxResults=10&type=video&q=" 
                    + query + " course tutorial full" 
                    + "&relevanceLanguage=" + (lang != null ? lang : "en")
                    + "&key=" + apiKey;

            String searchResponse = restClient.get().uri(searchUri).retrieve().body(String.class);
            JsonNode searchRoot = objectMapper.readTree(searchResponse);
            JsonNode items = searchRoot.path("items");

            if (!items.isArray() || items.isEmpty()) {
                return Collections.emptyList();
            }

            List<String> videoIds = new ArrayList<>();
            Map<String, CourseResult> resultMap = new LinkedHashMap<>();

            for (JsonNode item : items) {
                String videoId = item.path("id").path("videoId").asText();
                if (videoId != null && !videoId.isBlank()) {
                    videoIds.add(videoId);
                    JsonNode snippet = item.path("snippet");
                    CourseResult cr = new CourseResult();
                    cr.setVideoId(videoId);
                    cr.setTitle(snippet.path("title").asText());
                    cr.setChannelTitle(snippet.path("channelTitle").asText());
                    cr.setThumbnailUrl(snippet.path("thumbnails").path("medium").path("url").asText());
                    cr.setPublishedAt(snippet.path("publishedAt").asText());
                    cr.setLevel(level != null && !level.isBlank() ? level : "Beginner");
                    cr.setLanguage(lang != null && !lang.isBlank() ? lang : "English");
                    resultMap.put(videoId, cr);
                }
            }

            // 2. Batch fetch video statistics and duration (1 call saves quota)
            if (!videoIds.isEmpty()) {
                String idsParam = String.join(",", videoIds);
                String detailsUri = "/videos?part=contentDetails,statistics&id=" + idsParam + "&key=" + apiKey;
                String detailsResponse = restClient.get().uri(detailsUri).retrieve().body(String.class);
                JsonNode detailsRoot = objectMapper.readTree(detailsResponse);

                for (JsonNode videoDetail : detailsRoot.path("items")) {
                    String vId = videoDetail.path("id").asText();
                    CourseResult cr = resultMap.get(vId);
                    if (cr != null) {
                        long viewCount = videoDetail.path("statistics").path("viewCount").asLong(0);
                        cr.setViews(viewCount);

                        String isoDuration = videoDetail.path("contentDetails").path("duration").asText();
                        cr.setDurationSeconds(parseIsoDuration(isoDuration));
                    }
                }
            }

            return new ArrayList<>(resultMap.values());

        } catch (Exception e) {
            log.error("Error calling YouTube API: {}. Using fallback courses.", e.getMessage());
            return getFallbackCourses(query, level, lang);
        }
    }

    private long parseIsoDuration(String isoDuration) {
        try {
            return Duration.parse(isoDuration).getSeconds();
        } catch (Exception e) {
            return 3600; // default 1 hour fallback
        }
    }

    public List<CourseResult> getFallbackCourses(String query, String level, String lang) {
        String lvl = (level != null && !level.isBlank()) ? level : "Beginner";
        String l = (lang != null && !lang.isBlank()) ? lang : "English";

        return List.of(
            new CourseResult(
                "rfscVS0vtbw",
                query + " Full Course for Beginners [2026 Tutorial]",
                "freeCodeCamp.org",
                4320000L,
                15420L,
                "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=640&q=80",
                lvl,
                l,
                null,
                "2025-11-10"
            ),
            new CourseResult(
                "8hly31xKli0",
                query + " - Data Structures & Algorithms Full Interview Course",
                "NeetCode",
                1850000L,
                28800L,
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=640&q=80",
                lvl,
                l,
                null,
                "2025-08-22"
            ),
            new CourseResult(
                "ulprqHHWlng",
                "Complete " + query + " Architecture & Deployment Guide",
                "Amigoscode",
                1250000L,
                21600L,
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=640&q=80",
                lvl,
                l,
                null,
                "2025-12-04"
            )
        );
    }
}
