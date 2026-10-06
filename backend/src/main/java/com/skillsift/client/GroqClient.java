package com.skillsift.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsift.dto.CourseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.*;

@Component
public class GroqClient {

    private static final Logger log = LoggerFactory.getLogger(GroqClient.class);
    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    private final String apiKey;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public GroqClient(@Value("${groq.api.key:}") String apiKey, ObjectMapper objectMapper) {
        this.apiKey = apiKey;
        this.objectMapper = objectMapper;
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(Duration.ofSeconds(4));
        requestFactory.setReadTimeout(Duration.ofSeconds(8));
        this.restClient = RestClient.builder().requestFactory(requestFactory).build();
    }

    public Map<String, String> rankAndExplain(String query, String level, List<CourseResult> courses) {
        if (apiKey == null || apiKey.isBlank() || courses.isEmpty()) {
            return generateHeuristicExplanations(courses);
        }

        try {
            // Build compact prompt with ONLY real courses (prevents hallucination)
            List<Map<String, Object>> courseSummaries = new ArrayList<>();
            for (CourseResult c : courses) {
                Map<String, Object> map = new HashMap<>();
                map.put("videoId", c.getVideoId());
                map.put("title", c.getTitle());
                map.put("channel", c.getChannelTitle());
                map.put("views", c.getViews());
                courseSummaries.add(map);
            }

            String systemPrompt = "You are an academic advisor for college engineering students. "
                    + "Analyze the provided YouTube courses for topic '" + query + "' at level '" + level + "'. "
                    + "Provide a single concise sentence (max 15 words) explaining why each course is recommended. "
                    + "Return strictly a JSON object mapping videoId to reason string: {\"<videoId>\": \"<reason>\"}.";

            Map<String, Object> payload = Map.of(
                    "model", "llama-3.1-8b-instant",
                    "messages", List.of(
                            Map.of("role", "system", "content", systemPrompt),
                            Map.of("role", "user", "content", objectMapper.writeValueAsString(courseSummaries))
                    ),
                    "response_format", Map.of("type", "json_object"),
                    "temperature", 0.3
            );

            String response = restClient.post()
                    .uri(GROQ_API_URL)
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(objectMapper.writeValueAsString(payload))
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(response);
            String content = root.path("choices").get(0).path("message").path("content").asText();
            JsonNode reasonsMap = objectMapper.readTree(content);

            Map<String, String> result = new HashMap<>();
            reasonsMap.fields().forEachRemaining(entry -> {
                result.put(entry.getKey(), entry.getValue().asText());
            });

            return result;

        } catch (Exception e) {
            log.warn("Groq ranking failed or timed out: {}. Using heuristic ranking fallback.", e.getMessage());
            return generateHeuristicExplanations(courses);
        }
    }

    private Map<String, String> generateHeuristicExplanations(List<CourseResult> courses) {
        Map<String, String> reasons = new HashMap<>();
        for (int i = 0; i < courses.size(); i++) {
            CourseResult c = courses.get(i);
            String reason;
            if (i == 0) {
                reason = "Most recommended foundation with structured practical examples and high student ratings.";
            } else if (i == 1) {
                reason = "Targeted interview and university exam practice with clear conceptual breakdown.";
            } else {
                reason = "In-depth project-oriented walkthrough recommended by senior developers.";
            }
            reasons.put(c.getVideoId(), reason);
        }
        return reasons;
    }
}
