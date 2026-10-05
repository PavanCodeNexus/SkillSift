import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { playlistApi } from '../api/playlistApi';
import { ArrowLeft, Trash2, Folder, Play, Loader2 } from 'lucide-react';
import './Playlists.css';

export default function Playlists({ onBack, onWatchCourse }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      const data = await playlistApi.getPlaylists();
      setPlaylists(data);
      if (data.length > 0) {
        setSelectedPlaylist(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!selectedPlaylist) return;
    try {
      await playlistApi.removeItem(selectedPlaylist.id, itemId);
      const updatedItems = selectedPlaylist.items.filter(item => item.id !== itemId);
      const updatedPlaylist = { ...selectedPlaylist, items: updatedItems };
      setSelectedPlaylist(updatedPlaylist);
      setPlaylists(playlists.map(p => p.id === updatedPlaylist.id ? updatedPlaylist : p));
    } catch (err) {
      alert('Failed to remove course');
    }
  };

  return (
    <div className="playlists-page-layout">
      <Navbar />

      <main className="container playlists-page-container">
        <button type="button" className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <h1 className="playlists-page-title">My Playlists</h1>

        {loading ? (
          <div className="loading-state">
            <Loader2 size={32} className="spinner" />
          </div>
        ) : playlists.length === 0 ? (
          <div className="empty-playlists-box">
            <Folder size={48} className="empty-icon" />
            <p>You haven't created any playlists yet.</p>
            <span>Search courses and click "Save" on any card to start a playlist!</span>
          </div>
        ) : (
          <div className="playlist-columns">
            <div className="playlist-sidebar">
              {playlists.map(pl => (
                <button
                  key={pl.id}
                  type="button"
                  className={`playlist-nav-tab ${selectedPlaylist?.id === pl.id ? 'active' : ''}`}
                  onClick={() => setSelectedPlaylist(pl)}
                >
                  <Folder size={16} />
                  <span className="playlist-tab-name">{pl.name}</span>
                  <span className="playlist-count-pill">{pl.items?.length || 0}</span>
                </button>
              ))}
            </div>

            <div className="playlist-items-view">
              <h2 className="selected-playlist-heading">{selectedPlaylist?.name}</h2>
              {(!selectedPlaylist?.items || selectedPlaylist.items.length === 0) ? (
                <p className="no-items-text">This playlist is currently empty.</p>
              ) : (
                <div className="items-list">
                  {selectedPlaylist.items.map(item => (
                    <div key={item.id} className="playlist-row-card">
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="item-thumbnail" 
                      />
                      <div className="item-info">
                        <h4 className="item-title">{item.title}</h4>
                        <span className="item-channel">{item.channelTitle}</span>
                      </div>
                      <div className="item-actions">
                        <button 
                          type="button" 
                          className="item-play-btn"
                          onClick={() => onWatchCourse && onWatchCourse(item)}
                          title="Watch course"
                        >
                          <Play size={16} />
                        </button>
                        <button 
                          type="button" 
                          className="item-delete-btn"
                          onClick={() => handleRemoveItem(item.id)}
                          title="Remove from playlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
