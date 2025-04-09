import { FlatList, StyleSheet, RefreshControl, StatusBar } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import MatchCard from '@/components/MatchCard';
import { useAuth } from '@/hooks/useAuth';
import useMatches from '@/hooks/useMatches';
import { useEffect, useState } from 'react'; 
import NavigationTabs from '@/components/NavigationTabs';
import BaseHeader from '@/components/BaseHeader';
import GamesScroll from '@/components/GameScroll';
import CustomButton from '@/components/ui/CustomButton'; 

export default function MatchesScreen() {
  const { user } = useAuth();
  const { matches, loading, error, refreshMatches } = useMatches();
  const [selectedFilter, setSelectedFilter] = useState('Today'); 

  useEffect(() => {
    if (user) refreshMatches();
  }, [user]);

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />
      
      <ThemedView style={styles.container}>
        <BaseHeader label="Play" />

        <GamesScroll />

        <ThemedView style={styles.filterContainer}>
          {['Today', 'Tomorrow', 'This week'].map((filter) => (
            <CustomButton
              key={filter}
              title={filter}
              variant={selectedFilter === filter ? 'primary' : 'outline'}
              onPress={() => setSelectedFilter(filter)}
              style={styles.filterButton}
            />
          ))}
        </ThemedView>

        <FlatList
          data={matches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MatchCard match={item} />}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refreshMatches} />
          }
          ListEmptyComponent={
            <ThemedText style={styles.empty}>
              {error || 'No available matches'}
            </ThemedText>
          }
        />

        <NavigationTabs currentScreen="matches" />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
    paddingBottom: 83,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 18,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 0,
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