import React, { useState } from 'react';
import { Compass, User as UserIcon, LogOut, Bookmark, History, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export default function Navbar({ onAuthClick, onNavigate }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavClick = (view) => {
    setDropdownOpen(false);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-icon">
            <Compass size={24} color="#FFFFFF" />
          </div>
          <span className="brand-title">SkillSift</span>
        </div>

        <div className="navbar-actions">
          {/* Quick Direct Links in the Header for Instant Access */}
          {isAuthenticated && (
            <div className="nav-quick-links">
              <button 
                type="button" 
                className="nav-link-btn"
                onClick={() => handleNavClick('playlists')}
              >
                <Bookmark size={16} />
                <span>My Playlists</span>
              </button>
              <button 
                type="button" 
                className="nav-link-btn"
                onClick={() => handleNavClick('history')}
              >
                <History size={16} />
                <span>History</span>
              </button>
            </div>
          )}

          {isAuthenticated ? (
            <div className="user-profile-menu">
              <button 
                type="button"
                className="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title={user?.name || 'Account'}
              >
                <div className="avatar-circle">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="avatar-name">{user?.name}</span>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-user-info">
                    <p className="dropdown-name">{user?.name}</p>
                    <p className="dropdown-email">{user?.email}</p>
                    {user?.college && <p className="dropdown-college">🎓 {user?.college}</p>}
                  </div>
                  <div className="dropdown-divider" />
                  <button 
                    type="button" 
                    className="dropdown-item"
                    onClick={() => handleNavClick('home')}
                  >
                    <LayoutDashboard size={16} />
                    <span>Home & Catalog</span>
                  </button>
                  <button 
                    type="button" 
                    className="dropdown-item"
                    onClick={() => handleNavClick('playlists')}
                  >
                    <Bookmark size={16} />
                    <span>My Playlists</span>
                  </button>
                  <button 
                    type="button" 
                    className="dropdown-item"
                    onClick={() => handleNavClick('history')}
                  >
                    <History size={16} />
                    <span>Watch History</span>
                  </button>
                  <div className="dropdown-divider" />
                  <button 
                    type="button" 
                    className="dropdown-item logout-item"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              type="button" 
              className="navbar-login-btn"
              onClick={onAuthClick}
            >
              <UserIcon size={16} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
