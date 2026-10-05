import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CourseGrid from '../components/CourseGrid';
import AuthModal from '../components/AuthModal';
import { DUMMY_COURSES } from '../utils/dummyData';
import { useAuth } from '../hooks/useAuth';
import { Flame } from 'lucide-react';
import './Home.css';

export default function Home({ onNavigateToSearch, onWatchCourse, onSaveCourse, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [pendingQuery, setPendingQuery] = useState('');
  const [courses] = useState(DUMMY_COURSES);

  const handleSearch = (topic) => {
    if (!isAuthenticated) {
      setPendingQuery(topic);
      setAuthTab('login');
      setIsAuthOpen(true);
      return;
    }
    if (onNavigateToSearch) {
      onNavigateToSearch(topic);
    }
  };

  const handleWatch = (course) => {
    if (!isAuthenticated) {
      setAuthTab('login');
      setIsAuthOpen(true);
      return;
    }
    if (onWatchCourse) onWatchCourse(course);
  };

  const handleSave = (course) => {
    if (!isAuthenticated) {
      setAuthTab('register');
      setIsAuthOpen(true);
      return;
    }
    if (onSaveCourse) onSaveCourse(course);
  };

  return (
    <div className="home-layout">
      <Navbar 
        onSearchClick={() => handleSearch('Trending')} 
        onAuthClick={() => {
          setAuthTab('login');
          setIsAuthOpen(true);
        }}
        onNavigate={onNavigate}
      />

      <main className="container">
        <SearchBar onSearch={handleSearch} />

        <section className="trending-section">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="trending-icon-wrap">
                <Flame size={20} className="flame-icon" />
              </div>
              <h2 className="section-title">Trending for College Students</h2>
            </div>
            <span className="section-subtitle">Based on university semester syllabus and placement patterns</span>
          </div>

          <CourseGrid 
            courses={courses} 
            onWatch={handleWatch}
            onSave={handleSave}
          />
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>© 2026 SkillSift. Created for college students. Real YouTube courses curated by AI.</p>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthOpen}
        activeTab={authTab}
        onTabChange={setAuthTab}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          if (pendingQuery && onNavigateToSearch) {
            onNavigateToSearch(pendingQuery);
          }
        }}
      />
    </div>
  );
}
