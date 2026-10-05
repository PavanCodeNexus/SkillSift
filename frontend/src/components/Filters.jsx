import React from 'react';
import './Filters.css';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'kn', label: 'Kannada' },
  { code: 'te', label: 'Telugu' },
  { code: 'ta', label: 'Tamil' }
];

export default function Filters({ selectedLevel, onSelectLevel, selectedLang, onSelectLang }) {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <span className="filter-label">Level:</span>
        <div className="filter-chips">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={`filter-chip ${selectedLevel === lvl ? 'active' : ''}`}
              onClick={() => onSelectLevel(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Language:</span>
        <div className="filter-chips">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`filter-chip ${selectedLang === lang.code ? 'active' : ''}`}
              onClick={() => onSelectLang(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
