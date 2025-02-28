import { Redirect } from 'expo-router';
import { TabNavigator } from '../navigation/TabNavigation';

export default function AppLayout() {
  return <TabNavigator />;
}