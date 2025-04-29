// app/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { storeToken, getToken, removeToken } from '../utils/storage';
import { API_URL } from '../config';
import { User } from '../types/types';
import { usePathname } from 'expo-router';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  checkEmail: (email: string) => Promise<'login' | 'register'>;
  verifyCode: (email: string, code: string) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
    balance: number;
    avatarUrl?: string;
  }) => Promise<void>;
  uploadImage: (image: string) => Promise<string>;
  sendCode: (email: string) => Promise<void>;
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
  const pathname = usePathname(); 

  useEffect(() => {
    axios.defaults.baseURL = API_URL;
  }, []);


  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          await logout();
          router.replace('/(auth)/register');
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

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkEmail = useCallback(async (email: string): Promise<'login' | 'register'> => {
    setIsLoading(true);
    resetError();
    try {
      const res = await axios.post('/auth/check-email', { email });
      return res.data.exists ? 'login' : 'register';
    } catch (err) {
      let errorMessage = 'Email check failed';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyCode = useCallback(async (email: string, code: string) => {
    setIsLoading(true);
    resetError();
    try {
      const { data } = await axios.post('/auth/email/verify-code', { email, code });
      if (data === true) {
        router.push({ pathname: '/(auth)/profile-reg', params: { email: email } });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Code verification error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendCode = useCallback(async (email: string) => {
    setIsLoading(true);
    resetError();
  
    try {
      await axios.post('/auth/email/send-code', { email });
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to send code";
      setError(message);
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
    avatarUrl?: string; 
  }) => {
    setIsLoading(true);
    resetError();
  
    try {
      let avatarUrl: string | undefined;
  
      if (data.avatarUrl) {
        avatarUrl = await uploadImage(data.avatarUrl);
      }

      console.log('Email being sent:', data.email);

      const response = await axios.post('/users', {
        username: data.username,
        email: data.email,
        password: data.password,
        balance: data.balance,
        avatarUrl: avatarUrl,
      });
  
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
  

  const uploadImage = async (imageUri: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any);
  
    const response = await axios.post('/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.avatarUrl;
  };

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await removeToken();
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      router.replace('/(auth)/register');
    } catch (error) {
      setError('Logout failed. Please try again');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = async (email: string) => {
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
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        checkEmail,
        sendCode,
        verifyCode,
        register,
        uploadImage,
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