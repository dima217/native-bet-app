// app/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { storeToken, getToken, removeToken } from '../utils/storage';
import { API_URL } from '../config';
import { User } from '../types/types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
    balance: number;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  error: string | null;
  resetError: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.defaults.baseURL = API_URL;
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          await logout();
          router.replace('/(auth)/login');
        }
        return Promise.reject(error);
      }
    );
    
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        setUser(null);
        return;
      }
      const response = await axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      await logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    resetError();
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, ...userData } = response.data;

      await storeToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      router.replace('/(app)/bets');
    } catch (error) {
      let errorMessage = 'Invalid credentials';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: {
    username: string;
    email: string;
    password: string;
    balance: number;
  }) => {
    setIsLoading(true);
    resetError();
    try {
      const response = await axios.post('/users', data);
      await storeToken(response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      router.replace('/(app)/bets');
    } catch (error) {
      let errorMessage = 'Registration failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await removeToken();
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      setError('Logout failed. Please try again');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    resetError();
    try {
      await axios.post('/auth/forgot-password', { email: email });
    } catch (error) {
      let errorMessage = 'Failed to send reset instructions';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
        forgotPassword,
        error,
        resetError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}