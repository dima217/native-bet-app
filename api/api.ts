// api.ts
import axios from 'axios';
import { API_URL } from '../config';
import { getToken } from '../utils/storage';
import { router } from 'expo-router';
import { useAuth } from '../hooks/useAuth'

const { logout } = useAuth()

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      await logout();
      
      router.replace('/(auth)/login');
    }
    
    return Promise.reject(error);
  }
);

export default api;