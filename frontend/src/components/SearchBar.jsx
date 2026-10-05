import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import './SearchBar.css';

const POPULAR_TOPICS = ["Python", "DSA", "Java", "AWS", "Full Stack", "System Design"];

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleTopicClick = (topic) => {
    setQuery(topic);
    onSearch(topic);
  };

  return (
    <div className="search-hero">
      <div className="hero-badge">
        <Sparkles size={16} className="sparkle-icon" />
        <span>Curated & Ranked by AI for College Students</span>
      </div>

      <h1 className="hero-title">
        Find the best course.<br />
        <span className="hero-title-highlight">Not just any course.</span>
      </h1>

      <p className="hero-subtitle">
        Cut through thousands of noisy YouTube tutorials. Get genuine top courses ranked for your university curriculum and job placement prep.
      </p>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input 
            type="text"
            className="search-input"
            placeholder="What do you want to learn? (e.g., Python, LeetCode DSA, Spring Boot)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="search-submit-btn">
          Search Courses
        </button>
      </form>

      <div className="popular-topics">
        <span className="popular-label">Popular:</span>
        <div className="topic-chips">
          {POPULAR_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className="topic-chip"
              onClick={() => handleTopicClick(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
