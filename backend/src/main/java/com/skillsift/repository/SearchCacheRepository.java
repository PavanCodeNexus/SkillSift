package com.skillsift.repository;

import com.skillsift.model.SearchCache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SearchCacheRepository extends JpaRepository<SearchCache, Long> {
    Optional<SearchCache> findByCacheKey(String cacheKey);
}
