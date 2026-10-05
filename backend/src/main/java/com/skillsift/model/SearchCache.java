package com.skillsift.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "search_cache")
public class SearchCache {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, name = "cache_key")
    private String cacheKey;

    @Column(columnDefinition = "TEXT", nullable = false, name = "response_json")
    private String responseJson;

    @Column(name = "cached_at")
    private LocalDateTime cachedAt = LocalDateTime.now();

    public SearchCache() {}

    public SearchCache(String cacheKey, String responseJson) {
        this.cacheKey = cacheKey;
        this.responseJson = responseJson;
        this.cachedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCacheKey() {
        return cacheKey;
    }

    public void setCacheKey(String cacheKey) {
        this.cacheKey = cacheKey;
    }

    public String getResponseJson() {
        return responseJson;
    }

    public void setResponseJson(String responseJson) {
        this.responseJson = responseJson;
    }

    public LocalDateTime getCachedAt() {
        return cachedAt;
    }

    public void setCachedAt(LocalDateTime cachedAt) {
        this.cachedAt = cachedAt;
    }
}
