import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import Toast from 'react-native-toast-message'; 
import { toastConfig } from '@/components/ui/Toasts/CustomToasts'; 
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function RootLayout() {

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('transparent')
      NavigationBar.setButtonStyleAsync('light');
      NavigationBar.setBehaviorAsync('overlay-swipe'); 
    }
  }, []);

  return (
    <AuthProvider>
      <>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            headerShown: false,
            headerStyle: {
              backgroundColor: Colors.colors.background,
            },
            contentStyle: {
              backgroundColor: Colors.colors.background,
            },
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>

        <Toast config={toastConfig} />
      </>
    </AuthProvider>
  );
}
