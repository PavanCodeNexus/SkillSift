import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Results from './pages/Results';
import './styles/global.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <AuthProvider>
      <div className="app-root">
        {currentView === 'home' ? (
          <Home onNavigateToSearch={handleSearch} />
        ) : (
          <Results 
            initialQuery={searchQuery} 
            onBackToHome={handleBackToHome} 
          />
        )}
      </div>
    </AuthProvider>
  );
}
