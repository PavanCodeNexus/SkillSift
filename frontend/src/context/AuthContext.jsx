import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('skillsift_token');
    const savedUser = localStorage.getItem('skillsift_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('skillsift_token');
        localStorage.removeItem('skillsift_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    const authUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      education: data.education,
      college: data.college
    };

    setToken(data.token);
    setUser(authUser);
    localStorage.setItem('skillsift_token', data.token);
    localStorage.setItem('skillsift_user', JSON.stringify(authUser));
    return data;
  };

  const register = async (userData) => {
    const data = await authApi.register(userData);
    const authUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      education: data.education,
      college: data.college
    };

    setToken(data.token);
    setUser(authUser);
    localStorage.setItem('skillsift_token', data.token);
    localStorage.setItem('skillsift_user', JSON.stringify(authUser));
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('skillsift_token');
    localStorage.removeItem('skillsift_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
