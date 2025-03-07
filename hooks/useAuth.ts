import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    console.log(context);
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};