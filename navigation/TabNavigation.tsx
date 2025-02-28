import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MatchesScreen } from '../screens/MatchesScreen';
import { MyBetsScreen } from '../screens/MyBetsScreen';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  return (
    <Tab.Navigator
    id={undefined}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="football" size={24} color={color} />
          ),
          title: 'Matches',
        }}
      />
      <Tab.Screen
        name="MyBets"
        component={MyBetsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
          title: 'My bets',
        }}
      />
    </Tab.Navigator>
  );
};