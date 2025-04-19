import {
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import BetCard from '@/components/CustomCards/BetCard';
import { useUserBetsContext } from '@/contexts/UserBetsContext';
import NavigationTabs from '@/components/NavigationTabs';
import BaseHeader from '@/components/BaseHeader';

export default function MyBetsScreen() {
  const { user } = useAuth();
  const { bets, loading, error, refreshBets } = useUserBetsContext();

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Not authorized</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <BaseHeader label="My votes" />
      <ThemedView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <FlatList
            data={bets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <BetCard bet={item} />}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refreshBets} />
            }
            ListEmptyComponent={
              <ThemedText style={styles.empty}>
                {error || 'You have no active bets'}
              </ThemedText>
            }
          />
        )}
        <NavigationTabs currentScreen="bets" />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.6,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
