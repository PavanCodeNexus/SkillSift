import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { historyApi } from '../api/historyApi';
import { ArrowLeft, Trash2, Clock, Play, Loader2 } from 'lucide-react';
import './History.css';

export default function History({ onBack, onWatchCourse }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await historyApi.getHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear your entire watch history?')) return;
    try {
      await historyApi.clearHistory();
      setHistory([]);
    } catch (err) {
      alert('Failed to clear history');
    }
  };

  return (
    <div className="history-page-layout">
      <Navbar />

      <main className="container history-page-container">
        <button type="button" className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="history-header-row">
          <h1 className="history-page-title">Watch History</h1>
          {history.length > 0 && (
            <button 
              type="button" 
              className="clear-history-btn"
              onClick={handleClearHistory}
            >
              <Trash2 size={16} />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state">
            <Loader2 size={32} className="spinner" />
          </div>
        ) : history.length === 0 ? (
          <div className="empty-history-box">
            <Clock size={48} className="empty-icon" />
            <p>Your watch history is clear.</p>
            <span>Courses you open or watch will automatically appear here.</span>
          </div>
        ) : (
          <div className="history-list">
            {history.map(item => (
              <div key={item.id} className="history-item-row">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="history-thumb"
                />
                <div className="history-info">
                  <h4 className="history-item-title">{item.title}</h4>
                  <span className="history-channel">{item.channelTitle}</span>
                  <span className="history-timestamp">
                    {new Date(item.watchedAt).toLocaleDateString()} at {new Date(item.watchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <button 
                  type="button" 
                  className="history-watch-again-btn"
                  onClick={() => onWatchCourse && onWatchCourse(item)}
                  title="Watch again"
                >
                  <Play size={16} />
                  <span>Resume</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
