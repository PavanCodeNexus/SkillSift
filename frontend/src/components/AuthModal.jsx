import React from 'react';
import { X, Lock, Mail, User, School, GraduationCap } from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, activeTab = 'login', onTabChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="modal-tabs">
          <button 
            type="button" 
            className={`modal-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange('login')}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`modal-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange('register')}
          >
            Create Account
          </button>
        </div>

        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <p className="form-subtitle">Welcome back! Sign in to search and access your saved courses.</p>
            
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field-wrapper">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="student@college.edu" required />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field-wrapper">
                <Lock size={18} className="input-icon" />
                <input type="password" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <p className="form-subtitle">Join SkillSift to build custom playlists and track your learning progress.</p>
            
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-field-wrapper">
                <User size={18} className="input-icon" />
                <input type="text" placeholder="John Doe" required />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Education / Degree</label>
                <div className="input-field-wrapper">
                  <GraduationCap size={18} className="input-icon" />
                  <input type="text" placeholder="B.E Computer Science" required />
                </div>
              </div>
              <div className="input-group">
                <label>College / University</label>
                <div className="input-field-wrapper">
                  <School size={18} className="input-icon" />
                  <input type="text" placeholder="Engineering College" required />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field-wrapper">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="student@college.edu" required />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field-wrapper">
                <Lock size={18} className="input-icon" />
                <input type="password" placeholder="Min. 8 characters" required />
              </div>
            </div>

            <p className="privacy-note">
              🔒 We collect college details only to curate relevant courses. Your data is never sold or shared.
            </p>

            <button type="submit" className="auth-submit-btn">
              Register Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
