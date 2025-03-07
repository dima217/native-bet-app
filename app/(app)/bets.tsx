// screens/MyBetsScreen.tsx
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, Button } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import BetCard from '@/components/BetCard';
import { useUserBets } from '../../hooks/useUserBets';

export default function MyBetsScreen() {
  const { user, logout } = useAuth();
  const { bets, loading, error, refreshBets } = useUserBets();

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Not authorized</ThemedText>
      </ThemedView>
    );
  } 

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My bets</ThemedText>
      
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
              {error || 'You have not got any bets yet'}
            </ThemedText>
          }
        />
      )}
        <Button title="Logout" onPress={logout} />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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