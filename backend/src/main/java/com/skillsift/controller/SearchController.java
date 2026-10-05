package com.skillsift.controller;

import com.skillsift.dto.CourseResult;
import com.skillsift.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<List<CourseResult>> search(
            @RequestParam(name = "q", defaultValue = "") String query,
            @RequestParam(name = "level", defaultValue = "Beginner") String level,
            @RequestParam(name = "lang", defaultValue = "en") String lang) {
        List<CourseResult> results = searchService.search(query, level, lang);
        return ResponseEntity.ok(results);
    }
}
