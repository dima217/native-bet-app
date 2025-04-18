// api.ts
import axios from 'axios';
import { API_URL } from '@/config';
import { getToken } from '@/utils/storage';
import { router } from 'expo-router';

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
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { logout } = require('../hooks/useAuth').useAuth();

      await logout();
      router.replace('/(auth)/register');
    }

    return Promise.reject(error);
  }
);

export default api;
