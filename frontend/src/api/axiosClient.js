import axios from 'axios';

// If VITE_API_URL is set, use it; in production default to relative '/api' proxy, otherwise localhost
const defaultUrl = import.meta.env.PROD ? '/api' : 'http://localhost:8080/api';
const rawUrl = import.meta.env.VITE_API_URL || defaultUrl;
// Remove trailing slash if present
const API_BASE_URL = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT Authorization Bearer header
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skillsift_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry / 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('skillsift_token');
      localStorage.removeItem('skillsift_user');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
