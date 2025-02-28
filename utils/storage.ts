// app/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// utils/storage.ts
export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('auth_token', token);
    console.log('Token stored successfully'); 
  } catch (e) {
    console.error('Failed to save token:', e);
    throw e; 
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Error removing token:', error);
    throw error;
  }
};