import React from 'react';
import { Compass, Sparkles, User, Search } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onSearchClick }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand">
          <div className="brand-icon">
            <Compass size={24} color="#FFFFFF" />
          </div>
          <span className="brand-title">SkillSift</span>
        </div>

        <div className="navbar-actions">
          <button 
            type="button" 
            className="navbar-search-btn"
            onClick={onSearchClick}
            aria-label="Search courses"
          >
            <Search size={18} />
            <span className="search-btn-text">Quick search...</span>
          </button>

          <button 
            type="button" 
            className="navbar-login-btn"
            onClick={onSearchClick}
          >
            <User size={16} />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
}
