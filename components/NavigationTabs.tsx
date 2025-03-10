import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Colors } from '@/constants/Colors';

type Tab = 'matches' | 'bets' | 'profile';

export default function NavigationTabs({ currentScreen }: { currentScreen: Tab }) {
  const theme = useColorScheme() || 'light';
  const router = useRouter();

  const themeColors = {
    background: Colors[theme].background,
    border: Colors[theme].border,
    tabText: Colors[theme].text,
    activeTab: Colors[theme].tint,
  };

  return (
    <ThemedView style={[
      styles.container,
      {
        backgroundColor: themeColors.background,
        borderTopColor: themeColors.border,
      }
    ]}>
      <TouchableOpacity
        style={[
          styles.tab,
          currentScreen === 'matches' && {
            backgroundColor: themeColors.activeTab,
          }
        ]}
        onPress={() => router.replace('/(app)/matches')}
      >
        <ThemedText 
          style={[
            styles.tabText,
            currentScreen === 'matches' && styles.activeText,
            { color: themeColors.tabText }
          ]}
        >
          Matches
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          currentScreen === 'bets' && {
            backgroundColor: themeColors.activeTab,
          }
        ]}
        onPress={() => router.replace('/(app)/bets')}
      >
        <ThemedText 
          style={[
            styles.tabText,
            currentScreen === 'bets' && styles.activeText,
            { color: themeColors.tabText }
          ]}
        >
          My Bets
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          currentScreen === 'profile' && {
            backgroundColor: themeColors.activeTab,
          }
        ]}
        onPress={() => router.replace('/(app)/profile')}
      >
        <ThemedText 
          style={[
            styles.tabText,
            currentScreen === 'profile' && styles.activeText,
            { color: themeColors.tabText }
          ]}
        >
          Profile
        </ThemedText>
      </TouchableOpacity>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    padding: 10,
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
});