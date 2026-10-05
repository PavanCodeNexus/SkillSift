import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CourseGrid from '../components/CourseGrid';
import AuthModal from '../components/AuthModal';
import { HOME_COURSES, CATEGORIES } from '../utils/dummyData';
import { useAuth } from '../hooks/useAuth';
import { Sparkles } from 'lucide-react';
import './Home.css';

export default function Home({ onNavigateToSearch, onWatchCourse, onSaveCourse, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [pendingQuery, setPendingQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (topic) => {
    if (onNavigateToSearch) {
      onNavigateToSearch(topic);
    }
  };

  const handleWatch = (course) => {
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

  const filteredCourses = selectedCategory === 'all' 
    ? HOME_COURSES 
    : HOME_COURSES.filter(c => c.category === selectedCategory);

  return (
    <div className="home-layout">
      <Navbar 
        onAuthClick={() => {
          setAuthTab('login');
          setIsAuthOpen(true);
        }}
        onNavigate={onNavigate}
      />

      <main className="container">
        <SearchBar onSearch={handleSearch} />

        <section className="trending-section">
          <div className="category-tabs-container">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="section-header">
            <div className="section-title-wrap">
              <Sparkles size={20} className="sparkle-heading-icon" />
              <h2 className="section-title">
                {CATEGORIES.find(c => c.id === selectedCategory)?.label.replace(/^[^\s]+\s/, '')} Courses
              </h2>
            </div>
            <span className="section-subtitle">
              Curated for university semester exams, technical placements, and projects
            </span>
          </div>

          <CourseGrid 
            courses={filteredCourses} 
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
