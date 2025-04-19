import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { UserBetsProvider } from '@/contexts/UserBetsContext';

export default function RootLayout() {
  const colorScheme = useColorScheme() || 'light';

  return (
    <AuthProvider>
    <UserBetsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          contentStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        }}
      >
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        <Stack.Screen name="matches" options={{ headerShown: false }} />
        <Stack.Screen name="bets" options={{ headerShown: false }} />
      </Stack>
    </UserBetsProvider>
    </AuthProvider>
  );
}