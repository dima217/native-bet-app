import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import BetCard from '@/components/BetCard';
import { useUserBets } from '@/hooks/useUserBets';
import NavigationTabs from '@/components/NavigationTabs';

export default function MyBetsScreen() {
  const { user } = useAuth();
  const { bets, loading, error, refreshBets } = useUserBets();

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
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>My Bets</ThemedText>

        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <FlatList
            data={bets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <BetCard bet={item} />}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={refreshBets}
              />
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
  title: {
    marginBottom: 20,
    fontSize: 24,
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