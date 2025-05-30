import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import Toast from 'react-native-toast-message'; 
import { toastConfig } from '@/components/ui/Toasts/CustomToasts'; 
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useCooldownStore } from '../utils/useCooldownStore'

export default function RootLayout() {

  const tick = useCooldownStore((s) => s.tick);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('transparent');
      NavigationBar.setButtonStyleAsync('light');
      NavigationBar.setBehaviorAsync('overlay-swipe');
    }

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
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
