import React from 'react';
import CourseCard from './CourseCard';
import './CourseGrid.css';

export default function CourseGrid({ courses, onWatch, onSave }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="empty-grid">
        <p>No courses found. Try searching for a different topic!</p>
      </div>
    );
  }

  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard 
          key={course.id || course.videoId}
          course={course}
          onWatch={onWatch}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
