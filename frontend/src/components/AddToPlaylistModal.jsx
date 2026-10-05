import React, { useState, useEffect } from 'react';
import { X, Plus, FolderPlus, Check, Loader2 } from 'lucide-react';
import { playlistApi } from '../api/playlistApi';
import './AddToPlaylistModal.css';

export default function AddToPlaylistModal({ isOpen, onClose, course }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [creating, setCreating] = useState(false);
  const [savedStatus, setSavedStatus] = useState({});

  useEffect(() => {
    if (isOpen) {
      loadPlaylists();
      setSavedStatus({});
    }
  }, [isOpen]);

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      const data = await playlistApi.getPlaylists();
      setPlaylists(data);
    } catch (err) {
      console.error('Failed to load playlists', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    setCreating(true);
    try {
      const created = await playlistApi.createPlaylist(newPlaylistName.trim());
      setPlaylists([created, ...playlists]);
      setNewPlaylistName('');
      // Automatically add course to newly created playlist
      await handleAddToPlaylist(created.id);
    } catch (err) {
      console.error('Failed to create playlist', err);
    } finally {
      setCreating(false);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    if (!course) return;
    try {
      await playlistApi.addItem(playlistId, {
        videoId: course.videoId,
        title: course.title,
        thumbnailUrl: course.thumbnailUrl,
        channelTitle: course.channelTitle
      });
      setSavedStatus((prev) => ({ ...prev, [playlistId]: true }));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add to playlist');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h3 className="modal-heading">Save to Playlist</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="create-playlist-row" onSubmit={handleCreatePlaylist}>
          <input 
            type="text" 
            placeholder="New playlist name..."
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button type="submit" disabled={creating || !newPlaylistName.trim()}>
            <FolderPlus size={16} />
            <span>Create</span>
          </button>
        </form>

        <div className="playlist-list">
          {loading ? (
            <div className="modal-loader">
              <Loader2 size={24} className="spinner" />
            </div>
          ) : playlists.length === 0 ? (
            <p className="no-playlists-note">No playlists yet. Create your first one above!</p>
          ) : (
            playlists.map((pl) => (
              <div key={pl.id} className="playlist-option-row">
                <span className="playlist-option-name">{pl.name}</span>
                <button 
                  type="button" 
                  className={`add-item-btn ${savedStatus[pl.id] ? 'added' : ''}`}
                  onClick={() => handleAddToPlaylist(pl.id)}
                  disabled={savedStatus[pl.id]}
                >
                  {savedStatus[pl.id] ? (
                    <>
                      <Check size={14} />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
