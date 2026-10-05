import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { historyApi } from '../api/historyApi';
import { profileApi } from '../api/profileApi';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, Sparkles, Bookmark, FileText, Check, Loader2 } from 'lucide-react';
import './Watch.css';

export default function Watch({ course, onBack, onSave, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [notes, setNotes] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [noteSavedBanner, setNoteSavedBanner] = useState(false);

  useEffect(() => {
    if (course && isAuthenticated) {
      // Record in watch history
      historyApi.recordWatch({
        videoId: course.videoId,
        title: course.title,
        thumbnailUrl: course.thumbnailUrl,
        channelTitle: course.channelTitle
      }).catch(err => console.error('Failed to log watch history:', err));

      // Fetch existing video notes
      profileApi.getNote(course.videoId)
        .then(content => setNotes(content || ''))
        .catch(err => console.error('Failed to load notes', err));
    }
  }, [course, isAuthenticated]);

  const handleSaveNote = async () => {
    if (!course || !isAuthenticated) return;
    setSavingNote(true);
    try {
      await profileApi.saveNote(course.videoId, notes);
      setNoteSavedBanner(true);
      setTimeout(() => setNoteSavedBanner(false), 2500);
    } catch (err) {
      alert('Could not save note');
    } finally {
      setSavingNote(false);
    }
  };

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

          {/* Student Quick Notes & Timestamps Sidebar */}
          <div className="notes-column">
            <div className="notes-panel">
              <div className="notes-header">
                <div className="notes-title-wrap">
                  <FileText size={18} className="notes-icon" />
                  <h3>Study Notes & Timestamps</h3>
                </div>
                {noteSavedBanner && (
                  <span className="notes-saved-badge">
                    <Check size={12} /> Saved
                  </span>
                )}
              </div>
              <p className="notes-subtitle">
                Write key timestamps, algorithm formulas, or exam takeaways while learning:
              </p>
              <textarea 
                className="notes-textarea"
                placeholder="e.g. 12:40 - Binary Search tree edge case&#10;Key formula for exams:..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={!isAuthenticated}
              />
              <button 
                type="button" 
                className="save-notes-btn"
                onClick={handleSaveNote}
                disabled={savingNote || !isAuthenticated}
              >
                {savingNote ? <Loader2 size={14} className="spinner" /> : 'Save Study Notes'}
              </button>
              {!isAuthenticated && (
                <span className="notes-login-hint">Sign in to save study notes across sessions</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
