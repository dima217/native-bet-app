import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { Colors } from '@/constants/Colors';
import Trophy from '../assets/images/trophy1.svg';
import Burger from '../assets/images/burger1.svg';
import User from '../assets/images/User.svg';
import Swords from '../assets/images/Swords.svg';

type Tab = 'matches' | 'bets' | 'profile' | 'menu';

export default function NavigationTabs({ currentScreen }: { currentScreen: Tab }) {
  const theme = useColorScheme() || 'light';
  const router = useRouter();

  const themeColors = {
    background: Colors[theme].tab,
    border: Colors[theme].borderTab,
    iconColor: Colors[theme].text,
  };

  const tabs = [
    {
      key: 'matches',
      icon: (isActive: boolean) => <Trophy width={28} height={28} fill={isActive ? '#fff' : themeColors.iconColor} />,
      route: '/(app)/matches',
    },
    {
      key: 'bets',
      icon: (isActive: boolean) => <Swords width={28} height={28} fill={isActive ? '#fff' : themeColors.iconColor} />,
      route: '/(app)/bets',
    },
    {
      key: 'menu',
      icon: (isActive: boolean) => <Burger width={28} height={28} fill={isActive ? '#fff' : themeColors.iconColor} />,
      route: '/(app)/profile',
    },
    {
      key: 'profile',
      icon: (isActive: boolean) => <User width={28} height={28} fill={isActive ? '#fff' : themeColors.iconColor} />,
      route: '/(app)/profile',
    },
  ] as const;

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: themeColors.background,
          borderTopColor: themeColors.border,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => router.replace(tab.route)}
          >
            <View>{tab.icon(isActive)}</View>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 83,
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
    borderRadius: 12,
  },
});
