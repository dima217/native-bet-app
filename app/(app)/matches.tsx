import { FlatList, StyleSheet, RefreshControl, Button } from 'react-native';
import { ThemedView } from '../../components/ui/ThemedView';
import { ThemedText } from '../../components/ui/ThemedText';
import  MatchCard  from '../../components/MatchCard';
import { useAuth } from '../../hooks/useAuth';
import  useMatches  from '../../hooks/useMatches';
import { useEffect } from 'react';

export default function MatchesScreen() {
  const { user, logout } = useAuth();
  const { matches, loading, error, refreshMatches } = useMatches();

  useEffect(() => {
    if (user) refreshMatches();
  }, [user]);

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
       <ThemedView style={styles.container}>
            <ThemedText type="title">Profile</ThemedText>
            <ThemedText>Email: {user?.email}</ThemedText>
            <Button title="Logout" onPress={logout} />
        </ThemedView>
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