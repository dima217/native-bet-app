import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { ThemedView } from '../components/ui/ThemedView';
import { ThemedText } from '../components/ui/ThemedText';
import  MatchCard  from '../components/MatchCard';
import  useMatches  from '../hooks/useMatches';

export const MatchesScreen = () => {
  const { matches, loading, error, refreshMatches } = useMatches();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Active Matches</ThemedText>
      
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshMatches}
          />
        }
        ListEmptyComponent={
          <ThemedText style={styles.empty}>
            {error || 'No access matches'}
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