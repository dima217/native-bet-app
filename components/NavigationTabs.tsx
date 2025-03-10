import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/CustomButton';

type Tab = 'matches' | 'bets';

export default function NavigationTabs({ currentScreen }: { currentScreen: Tab }) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, currentScreen === 'matches' && styles.activeTab]}
        onPress={() => router.replace('/(app)/matches')}
      >
        <ThemedText 
          style={[styles.tabText, currentScreen === 'matches' && styles.activeText]}
        >
          Matches
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentScreen === 'bets' && styles.activeTab]}
        onPress={() => router.push('/(app)/bets')}
      >
        <ThemedText 
          style={[styles.tabText, currentScreen === 'bets' && styles.activeText]}
        >
          My Bets
        </ThemedText>
      </TouchableOpacity>

      <CustomButton 
        title="Logout" 
        onPress={logout}
        style={styles.logoutButton}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    padding: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeText: {
    color: '#fff',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '500',
  },
});