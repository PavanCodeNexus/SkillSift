import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Results from './pages/Results';
import Watch from './pages/Watch';
import Playlists from './pages/Playlists';
import History from './pages/History';
import AddToPlaylistModal from './components/AddToPlaylistModal';
import './styles/global.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourse, setActiveCourse] = useState(null);
  const [playlistModalCourse, setPlaylistModalCourse] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView('results');
  };

  const handleWatchCourse = (course) => {
    setActiveCourse(course);
    setCurrentView('watch');
  };

  const handleOpenPlaylistModal = (course) => {
    setPlaylistModalCourse(course);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <AuthProvider>
      <div className="app-root">
        {currentView === 'home' && (
          <Home 
            onNavigateToSearch={handleSearch}
            onWatchCourse={handleWatchCourse}
            onSaveCourse={handleOpenPlaylistModal}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'results' && (
          <Results 
            initialQuery={searchQuery} 
            onBackToHome={() => setCurrentView('home')} 
            onWatchCourse={handleWatchCourse}
            onSaveCourse={handleOpenPlaylistModal}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'watch' && (
          <Watch 
            course={activeCourse}
            onBack={() => setCurrentView('results')}
            onSave={handleOpenPlaylistModal}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'playlists' && (
          <Playlists 
            onBack={() => setCurrentView('home')}
            onWatchCourse={handleWatchCourse}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'history' && (
          <History 
            onBack={() => setCurrentView('home')}
            onWatchCourse={handleWatchCourse}
            onNavigate={handleNavigate}
          />
        )}

        <AddToPlaylistModal 
          isOpen={!!playlistModalCourse}
          course={playlistModalCourse}
          onClose={() => setPlaylistModalCourse(null)}
        />
      </div>
    </AuthProvider>
  );
}
