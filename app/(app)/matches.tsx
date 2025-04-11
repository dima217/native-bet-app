import { FlatList, StyleSheet, RefreshControl, StatusBar, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import MatchCard from '@/components/MatchCard';
import MatchDetailsCard from '@/components/MatchDetailsCard';
import { useAuth } from '@/hooks/useAuth';
import useMatches from '@/hooks/useMatches';
import NavigationTabs from '@/components/NavigationTabs';
import BaseHeader from '@/components/BaseHeader';
import GamesScroll from '@/components/GameScroll';
import { Match } from '@/types/types';
import CustomButtonGroup from '@/components/ui/CustomButtonGroup';

export default function MatchesScreen() {
  const { user } = useAuth();
  const { matches, loading, error, refreshMatches } = useMatches();
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    if (user) refreshMatches();
  }, [user]);

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />
      <BaseHeader label="Play" />

      <ThemedView style={styles.container}>
        <GamesScroll />

      {!selectedMatch && (
      <ThemedView style={styles.filterContainer}>
      <CustomButtonGroup
        options={['Today', 'Tomorrow', 'This week']}
        selected={selectedFilter}
        onSelect={setSelectedFilter}
      />
    </ThemedView>
      )}
        {selectedMatch ? (
          <View style={styles.detailsWrapper}>
             <MatchDetailsCard match={selectedMatch} onBack={() => setSelectedMatch(null)} />
          </View>
          ) : (
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <MatchCard match={item} onPress={() => setSelectedMatch(item)} />
          )}
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
        )}
      <NavigationTabs currentScreen="matches" />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({

  detailsWrapper: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 5,
    paddingBottom: 83,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0166FE',
    borderRadius: 25,
    overflow: 'hidden',
    height: 40,
    marginTop: 15,
    marginBottom: 18,
  },
  filterButton: {
    flex: 1,
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
