import { FlatList, StyleSheet, RefreshControl, StatusBar } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import MatchCard from '@/components/MatchCard';
import { useAuth } from '@/hooks/useAuth';
import useMatches  from '@/hooks/useMatches';
import { useEffect } from 'react';
import NavigationTabs from '@/components/NavigationTabs';

export default function MatchesScreen() {
  const { user } = useAuth();
  const { matches, loading, error, refreshMatches } = useMatches();

  useEffect(() => {
    if (user) refreshMatches();
  }, [user]);

  return (
    <> <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
    
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Active Matches</ThemedText>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl
          refreshing={loading}
          onRefresh={refreshMatches} />}
        ListEmptyComponent={<ThemedText style={styles.empty}>
          {error || 'No available matches'}
        </ThemedText>} />

      <NavigationTabs currentScreen="matches" />
    </ThemedView></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
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
});