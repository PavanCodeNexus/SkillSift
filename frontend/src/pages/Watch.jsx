import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { historyApi } from '../api/historyApi';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, Sparkles, Bookmark } from 'lucide-react';
import './Watch.css';

export default function Watch({ course, onBack, onSave, onNavigate }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (course && isAuthenticated) {
      // Record in watch history
      historyApi.recordWatch({
        videoId: course.videoId,
        title: course.title,
        thumbnailUrl: course.thumbnailUrl,
        channelTitle: course.channelTitle
      }).catch(err => console.error('Failed to log watch history:', err));
    }
  }, [course, isAuthenticated]);

  if (!course) return null;

  return (
    <div className="watch-layout">
      <Navbar onNavigate={onNavigate} />

      <main className="container watch-container">
        <button type="button" className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="watch-main-grid">
          <div className="player-column">
            <div className="video-player-wrapper">
              <iframe
                title={course.title}
                src={`https://www.youtube-nocookie.com/embed/${course.videoId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-iframe"
              />
            </div>

            <div className="video-details-header">
              <h1 className="video-title">{course.title}</h1>
              
              <div className="video-action-bar">
                <div className="video-channel-info">
                  <span className="channel-badge">{course.channelTitle}</span>
                  <span className="level-badge">{course.level}</span>
                </div>

                <button 
                  type="button" 
                  className="save-playlist-btn"
                  onClick={() => onSave && onSave(course)}
                >
                  <Bookmark size={16} />
                  <span>Save to Playlist</span>
                </button>
              </div>

              {course.aiReason && (
                <div className="watch-ai-reason">
                  <Sparkles size={16} className="sparkle" />
                  <p><strong>AI Verdict:</strong> {course.aiReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
