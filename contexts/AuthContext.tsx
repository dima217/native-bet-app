// app/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
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
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.defaults.baseURL = API_URL;
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          await logout();
          router.replace('/(auth)/login');
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const checkAuth = async () => {
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
  };
  
  useEffect(() => {
    if (user) {
      router.replace('/(app)/profile');
    }
  }, [user]);

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    const { token, ...userData } = response.data; 

    console.log('Received token:', token);
    
    await storeToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    
    router.replace('/(app)/profile');
  } catch (error) {
    let errorMessage = 'Invalid credentials';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    }
    throw new Error(errorMessage);
  }
};

  const register = async (data: {
  username: string;
  email: string;
  password: string;
  balance: number;
}) =>  { try {
    const response = await axios.post('/users', data);
    
    await storeToken(response.data.token);
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
    setUser(response.data.user); 
    
  } catch (error) {
    let errorMessage = 'Registration failed';
    
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    console.error('Registration error:', errorMessage);
    throw new Error(errorMessage);
  }
};

  const logout = async () => {
    try {
      await removeToken();
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      throw new Error('Logout failed. Please try again');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}