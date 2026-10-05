import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        <Home />
      </div>
    </AuthProvider>
  );
}
