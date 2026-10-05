import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import CourseGrid from '../components/CourseGrid';
import AuthModal from '../components/AuthModal';
import { searchApi } from '../api/searchApi';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import './Results.css';

export default function Results({ initialQuery, onBackToHome, onWatchCourse, onSaveCourse, onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState(initialQuery || '');
  const [level, setLevel] = useState('Beginner');
  const [goal, setGoal] = useState('all');
  const [lang, setLang] = useState('en');

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    fetchResults();
  }, [query, level, goal, lang]);

  const fetchResults = async () => {
    if (!query) return;
    setLoading(true);
    setError('');

    try {
      const effectiveQuery = goal !== 'all' ? `${query} ${goal}` : query;
      const data = await searchApi.search(effectiveQuery, level, lang);
      setCourses(data);
    } catch (err) {
      setError('Could not load course recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const aiTop5 = courses.slice(0, 5);
  const moreResults = courses.slice(5);

  const handleWatch = (course) => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    if (onWatchCourse) {
      onWatchCourse(course);
    }
  };

  const handleSave = (course) => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    if (onSaveCourse) {
      onSaveCourse(course);
    }
  };

  return (
    <div className="results-layout">
      <Navbar 
        onSearchClick={() => setIsAuthOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        onNavigate={onNavigate}
      />

      <main className="container results-container">
        <div className="results-header">
          <button type="button" className="back-btn" onClick={onBackToHome}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
          <h1 className="results-title">
            Curated Courses for <span className="highlight-query">"{query}"</span>
          </h1>
        </div>

        <Filters 
          selectedLevel={level}
          onSelectLevel={setLevel}
          selectedGoal={goal}
          onSelectGoal={setGoal}
          selectedLang={lang}
          onSelectLang={setLang}
        />

        {loading ? (
          <div className="loading-state">
            <Loader2 size={36} className="spinner" />
            <p>Searching YouTube & ranking top courses with AI...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <AlertCircle size={32} />
            <p>{error}</p>
            <button type="button" className="retry-btn" onClick={fetchResults}>Retry</button>
          </div>
        ) : (
          <div className="results-sections">
            {aiTop5.length > 0 && (
              <section className="top5-section">
                <div className="top5-badge-wrap">
                  <Sparkles size={18} className="top5-sparkle" />
                  <h2 className="top5-title">⭐ AI Top Recommended Courses</h2>
                </div>
                <CourseGrid 
                  courses={aiTop5} 
                  onWatch={handleWatch}
                  onSave={handleSave}
                />
              </section>
            )}

            {moreResults.length > 0 && (
              <section className="more-section">
                <h3 className="more-title">More YouTube Results</h3>
                <CourseGrid 
                  courses={moreResults} 
                  onWatch={handleWatch}
                  onSave={handleSave}
                />
              </section>
            )}
          </div>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
