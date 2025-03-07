import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchesScreen  from '../app/(app)/matches';
import  MyBetsScreen  from '../app/(app)/bets';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { useAuth } from '@/hooks/useAuth';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60, 
          paddingBottom: 4, 
        },
        tabBarLabelStyle: {
          fontSize: 12, 
          fontWeight: '500',
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
        }}
      />
      <Tab.Screen
        name="MyBets"
        component={MyBetsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
