import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, School, GraduationCap, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, activeTab = 'login', onTabChange, onSuccess }) {
  const { login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [college, setCollege] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleTabSwitch = (tab) => {
    setErrorMessage('');
    if (onTabChange) onTabChange(tab);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await login({ email, password });
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await register({ name, education, college, email, password });
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={() => handleTabSwitch('login')}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`modal-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Create Account
          </button>
        </div>

        {errorMessage && (
          <div className="auth-error-banner">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <p className="form-subtitle">Welcome back! Sign in to search and access your saved courses.</p>
            
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="student@college.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <Loader2 size={18} className="spinner" /> : 'Sign In'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <p className="form-subtitle">Join SkillSift to build custom playlists and track your learning progress.</p>
            
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-field-wrapper">
                <UserIcon size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Education / Degree</label>
                <div className="input-field-wrapper">
                  <GraduationCap size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="B.E Computer Science" 
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>College / University</label>
                <div className="input-field-wrapper">
                  <School size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Engineering College" 
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="student@college.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Min. 6 characters" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required 
                />
              </div>
            </div>

            <p className="privacy-note">
              🔒 We collect college details only to curate relevant courses. Your data is never sold or shared.
            </p>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <Loader2 size={18} className="spinner" /> : 'Register Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
