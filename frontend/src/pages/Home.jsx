import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CourseGrid from '../components/CourseGrid';
import AuthModal from '../components/AuthModal';
import { DUMMY_COURSES } from '../utils/dummyData';
import { Flame } from 'lucide-react';
import './Home.css';

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [courses] = useState(DUMMY_COURSES);

  const handleSearch = (topic) => {
    // Per PRD Section 5: Unauthenticated search triggers Login / Register popup
    setAuthTab('login');
    setIsAuthOpen(true);
  };

  const handleWatch = (course) => {
    // Open watch or prompt auth
    setAuthTab('login');
    setIsAuthOpen(true);
  };

  const handleSave = (course) => {
    // Save to playlist requires account
    setAuthTab('register');
    setIsAuthOpen(true);
  };

  return (
    <div className="home-layout">
      <Navbar onSearchClick={() => setIsAuthOpen(true)} />

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
      />
    </div>
  );
}
