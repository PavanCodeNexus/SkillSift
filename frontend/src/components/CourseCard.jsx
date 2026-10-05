import React from 'react';
import { Play, Bookmark, Clock, Eye, Sparkles } from 'lucide-react';
import { formatViews, formatDuration } from '../utils/formatters';
import './CourseCard.css';

export default function CourseCard({ course, onWatch, onSave }) {
  const handleSave = (e) => {
    e.stopPropagation();
    if (onSave) onSave(course);
  };

  const handleWatch = () => {
    if (onWatch) onWatch(course);
  };

  return (
    <article className="course-card" onClick={handleWatch}>
      <div className="card-thumbnail-wrapper">
        <img 
          src={course.thumbnailUrl} 
          alt={course.title}
          className="card-thumbnail"
          loading="lazy"
        />
        <span className="card-duration-badge">
          <Clock size={12} />
          {formatDuration(course.durationSeconds)}
        </span>
      </div>

      <div className="card-content">
        <h3 className="card-title" title={course.title}>
          {course.title}
        </h3>

        <div className="card-meta">
          <span className="channel-name">{course.channelTitle}</span>
          <span className="meta-dot">•</span>
          <span className="view-count">
            <Eye size={12} className="meta-icon" />
            {formatViews(course.views)}
          </span>
        </div>

        <div className="card-tags">
          <span className={`tag level-tag level-${course.level.toLowerCase()}`}>
            {course.level}
          </span>
          <span className="tag lang-tag">
            {course.language}
          </span>
        </div>

        {course.aiReason && (
          <div className="ai-reason-box">
            <Sparkles size={14} className="ai-icon" />
            <p className="ai-reason-text">{course.aiReason}</p>
          </div>
        )}

        <div className="card-footer">
          <button 
            type="button" 
            className="action-btn watch-btn"
            onClick={handleWatch}
          >
            <Play size={14} fill="currentColor" />
            <span>Watch</span>
          </button>
          
          <button 
            type="button" 
            className="action-btn save-btn"
            onClick={handleSave}
            title="Save to Playlist"
          >
            <Bookmark size={15} />
            <span>Save</span>
          </button>
        </div>
      </div>
    </article>
  );
}
