import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { profileApi } from '../api/profileApi';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, User, GraduationCap, School, Mail, Bookmark, History, Check, Loader2 } from 'lucide-react';
import './Profile.css';

export default function Profile({ onBack, onNavigate }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [college, setCollege] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await profileApi.getProfile();
      setProfile(data);
      setName(data.name || '');
      setEducation(data.education || '');
      setCollege(data.college || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      const updated = await profileApi.updateProfile({
        name,
        education,
        college
      });
      setProfile(updated);
      setEditing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-layout">
      <Navbar onNavigate={onNavigate} />

      <main className="container profile-container">
        <button type="button" className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <h1 className="profile-title">Student Profile & Learning Dashboard</h1>

        {loading ? (
          <div className="loading-state">
            <Loader2 size={32} className="spinner" />
          </div>
        ) : (
          <div className="profile-grid">
            <div className="profile-card user-summary-card">
              <div className="large-avatar">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <h2 className="summary-name">{profile?.name}</h2>
              <span className="summary-email">{profile?.email}</span>

              <div className="summary-meta-pills">
                {profile?.education && (
                  <span className="summary-pill">
                    <GraduationCap size={14} />
                    {profile.education}
                  </span>
                )}
                {profile?.college && (
                  <span className="summary-pill">
                    <School size={14} />
                    {profile.college}
                  </span>
                )}
              </div>

              <div className="profile-stats-row">
                <div className="stat-box" onClick={() => onNavigate && onNavigate('playlists')}>
                  <Bookmark size={20} className="stat-icon" />
                  <span className="stat-number">{profile?.playlistCount || 0}</span>
                  <span className="stat-label">Playlists</span>
                </div>
                <div className="stat-box" onClick={() => onNavigate && onNavigate('history')}>
                  <History size={20} className="stat-icon" />
                  <span className="stat-number">{profile?.historyCount || 0}</span>
                  <span className="stat-label">Watched</span>
                </div>
              </div>
            </div>

            <div className="profile-card edit-card">
              <div className="edit-card-header">
                <h3>Academic & Personal Information</h3>
                {!editing ? (
                  <button 
                    type="button" 
                    className="edit-toggle-btn"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : null}
              </div>

              {savedSuccess && (
                <div className="save-success-banner">
                  <Check size={16} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSave} className="profile-form">
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="input-field-wrapper">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!editing}
                      required 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Email Address (Account ID)</label>
                  <div className="input-field-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      value={profile?.email || ''} 
                      disabled
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Education / Degree</label>
                  <div className="input-field-wrapper">
                    <GraduationCap size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="e.g. B.Tech Computer Science" 
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>College / University</label>
                  <div className="input-field-wrapper">
                    <School size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="e.g. Engineering College / VTU" 
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                </div>

                {editing && (
                  <div className="form-actions-row">
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setEditing(false)}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="save-btn"
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
