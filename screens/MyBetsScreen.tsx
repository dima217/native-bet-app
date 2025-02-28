import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { ThemedText } from '../components/ui/ThemedText';
import { ThemedView } from '../components/ui/ThemedView';
import { BetCard } from '../components/BetCard';
import  useUserBets  from '../hooks/useUserBets';

export const MyBetsScreen = () => {
  const { bets, loading, error, refreshBets } = useUserBets();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Bets</ThemedText>
      
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
            {error || 'You have not got bets yet'}
          </ThemedText>
        }
      />
    </ThemedView>
  );
};

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
});