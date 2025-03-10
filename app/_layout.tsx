import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme() || 'light';

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}