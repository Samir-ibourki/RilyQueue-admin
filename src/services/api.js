import axios from 'axios';

// Update base URL relying on your Spring Boot environment details
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token if available
api.interceptors.request.use(
  (config) => {
    // Assuming auth storage mechanism utilizes local storage (Zustand persist)
    // Extracting it manually or assuming it's available via token
    const authStorageStr = localStorage.getItem('auth-storage');
    let token = null;

    if (authStorageStr) {
      try {
        const parsed = JSON.parse(authStorageStr);
        token = parsed?.state?.token;
      } catch (e) {
        console.error('Failed to parse auth token', e);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling global API responses/errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Implement redirect to login or clearing storage here
        console.warn('Unauthorized access - potentially expired token');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
