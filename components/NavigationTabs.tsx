import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ui/ThemedText';

// Import Icons
import TrophyActive from '../assets/images/TrophyActive.svg';
import TrophyInactive from '../assets/images/TrophyInactive.svg';
import BurgerActive from '../assets/images/BurgerActive.svg';
import BurgerInactive from '../assets/images/BurgerInactive.svg';
import UserActive from '../assets/images/UserActive.svg';
import UserInactive from '../assets/images/UserInactive.svg';
import SwordsActive from '../assets/images/SwordsActive.svg';
import SwordsInactive from '../assets/images/SwordsInactive.svg';

type Tab = 'matches' | 'bets' | 'profile' | 'leaders';

export default function NavigationTabs({ currentScreen }: { currentScreen: Tab }) {
  const theme = useColorScheme() || 'light';
  const router = useRouter();

  const themeColors = {
    background: Colors.colors.tab,
    border: Colors.colors.borderTab,
    iconColor: Colors.colors.textInactive,
  };

  const tabs = [
    {
      key: 'matches',
      iconActive: <SwordsActive width={28} height={28} />,
      iconInactive: <SwordsInactive width={28} height={28} />,
      route: '/(app)/matches',
      label: 'Play',
    },
    {
      key: 'bets',
      iconActive: <BurgerActive width={28} height={28} />,
      iconInactive: <BurgerInactive width={28} height={28} />,
      route: '/(app)/bets',
      label: 'My votes',
    },
    {
      key: 'leaders',
      iconActive: <TrophyActive width={28} height={28} />,
      iconInactive: <TrophyInactive width={28} height={28} />,
      route: '/(app)/leaders',
      label: 'Leaders',
    },
    {
      key: 'profile',
      iconActive: <UserActive width={28} height={28} />,
      iconInactive: <UserInactive width={28} height={28} />,
      route: '/(app)/profile',
      label: 'My account',
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
            style={[styles.tab]}
            onPress={() => router.replace(tab.route)}
          >
            <View style={styles.iconContainer}>
              {isActive ? tab.iconActive : tab.iconInactive}
              <ThemedText style={[
                styles.tabLabel,
                { color: isActive ? '#fff' : themeColors.iconColor },
                isActive && styles.activeLabel,
              ]}>
                {tab.label}
              </ThemedText>
            </View>
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
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '500',
  },
  activeLabel: {
    fontWeight: 'bold',
  },
});
