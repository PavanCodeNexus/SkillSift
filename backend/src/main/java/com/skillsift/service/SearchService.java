package com.skillsift.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsift.client.YouTubeClient;
import com.skillsift.dto.CourseResult;
import com.skillsift.model.SearchCache;
import com.skillsift.repository.SearchCacheRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SearchService {

    private static final Logger log = LoggerFactory.getLogger(SearchService.class);
    private static final long CACHE_TTL_HOURS = 24;

    private final SearchCacheRepository searchCacheRepository;
    private final YouTubeClient youTubeClient;
    private final RankingService rankingService;
    private final ObjectMapper objectMapper;

    public SearchService(SearchCacheRepository searchCacheRepository,
                         YouTubeClient youTubeClient,
                         RankingService rankingService,
                         ObjectMapper objectMapper) {
        this.searchCacheRepository = searchCacheRepository;
        this.youTubeClient = youTubeClient;
        this.rankingService = rankingService;
        this.objectMapper = objectMapper;
    }

    public List<CourseResult> search(String query, String level, String lang) {
        String cleanQuery = (query != null ? query.trim().toLowerCase() : "");
        String cleanLevel = (level != null ? level.trim().toLowerCase() : "beginner");
        String cleanLang = (lang != null ? lang.trim().toLowerCase() : "en");
        String cacheKey = cleanQuery + ":" + cleanLevel + ":" + cleanLang;

        // 1. Check cache to preserve API quota
        Optional<SearchCache> cached = searchCacheRepository.findByCacheKey(cacheKey);
        if (cached.isPresent()) {
            SearchCache entry = cached.get();
            if (entry.getCachedAt().isAfter(LocalDateTime.now().minusHours(CACHE_TTL_HOURS))) {
                try {
                    log.info("Cache HIT for query '{}'", cacheKey);
                    return objectMapper.readValue(entry.getResponseJson(), new TypeReference<List<CourseResult>>() {});
                } catch (Exception e) {
                    log.error("Failed to parse cached response: {}", e.getMessage());
                }
            }
        }

        // 2. Fetch fresh from YouTube API
        log.info("Cache MISS for query '{}'. Fetching from YouTube...", cacheKey);
        List<CourseResult> rawResults = youTubeClient.searchCourses(cleanQuery, cleanLevel, cleanLang);

        // 3. AI Rank and generate reasons
        List<CourseResult> rankedResults = rankingService.rankAndExplain(cleanQuery, cleanLevel, rawResults);

        // 4. Save to cache
        try {
            String json = objectMapper.writeValueAsString(rankedResults);
            SearchCache cacheEntry = cached.orElse(new SearchCache());
            cacheEntry.setCacheKey(cacheKey);
            cacheEntry.setResponseJson(json);
            cacheEntry.setCachedAt(LocalDateTime.now());
            searchCacheRepository.save(cacheEntry);
        } catch (Exception e) {
            log.error("Failed to save search results to cache: {}", e.getMessage());
        }

        return rankedResults;
    }
}
