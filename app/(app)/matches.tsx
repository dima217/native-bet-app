import {
  Animated,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import MatchCard from '@/components/CustomCards/MatchCard';
import MatchDetailsCard from '@/components/CustomCards/MatchDetailsCard';
import { useAuth } from '@/hooks/useAuth';
import useMatches from '@/hooks/useMatches';
import NavigationTabs from '@/components/NavigationTabs';
import BaseHeader from '@/components/BaseHeader';
import GamesScroll from '@/components/GameScroll';
import { Match, SportType } from '@/types/types';
import CustomButtonGroup from '@/components/ui/Buttons/CustomButtonGroup';
import { isToday, isTomorrow, isThisWeek } from 'date-fns';

export default function MatchesScreen() {
  const { user } = useAuth();
  const { matches, loading, error, refreshMatches } = useMatches();
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedGameId, setSelectedGameId] = useState<SportType>(SportType.LOL);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage, setMatchesPerPage] = useState(20);

  const tabTranslateY = useRef(new Animated.Value(0)).current;
  const tabOpacity = useRef(new Animated.Value(1)).current;

  const lastOffsetY = useRef(0);

  useEffect(() => {
    if (user) refreshMatches(); 
  }, [user, refreshMatches]);

  const filteredMatches = matches.filter((match) => {
    const matchDate = new Date(match.beginAt);
    const isDateMatch = (() => {
      switch (selectedFilter) {
        case 'Today':
          return isToday(matchDate);
        case 'Tomorrow':
          return isTomorrow(matchDate);
        case 'This week':
          return isThisWeek(matchDate, { weekStartsOn: 1 });
        default:
          return true;
      }
    })();

    return isDateMatch && match.sportType === selectedGameId;
  });

  // Paginate filtered matches
  const totalPages = Math.max(1, Math.ceil(filteredMatches.length / matchesPerPage));
  const safePage = Math.min(currentPage, totalPages); 
  const startIdx = (safePage - 1) * matchesPerPage;
  const paginatedMatches = filteredMatches.slice(startIdx, startIdx + matchesPerPage);


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY > lastOffsetY.current + 10) {
      // Scroll down
      Animated.timing(tabTranslateY, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(tabOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (offsetY < lastOffsetY.current - 10) {
      // Scroll up
      Animated.timing(tabTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(tabOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    lastOffsetY.current = offsetY;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />
      <BaseHeader label="Play" />

      <ThemedView style={styles.container}>
        <GamesScroll selectedGame={selectedGameId} onSelect={setSelectedGameId} />

        {!selectedMatch && (
          <View style={styles.button}>
            <CustomButtonGroup
              options={['Today', 'Tomorrow', 'This week']}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </View>
        )}

        {selectedMatch ? (
          <View style={styles.detailsWrapper}>
            <MatchDetailsCard match={selectedMatch} onBack={() => setSelectedMatch(null)} />
          </View>
        ) : (
          <FlatList
            data={paginatedMatches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MatchCard match={item} onPress={() => setSelectedMatch(item)} />
            )}
            contentContainerStyle={styles.list}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshMatches} />}
            ListEmptyComponent={
              <ThemedText style={styles.empty}>
                {error || 'No available matches'}
              </ThemedText>
            }
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        )}

        {/* Pagination Controls */}
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
            disabled={currentPage === 1}
            onPress={() => handlePageChange(currentPage - 1)}
          >
            <ThemedText style={styles.pageText}>Previous</ThemedText>
          </TouchableOpacity>

          <ThemedText style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </ThemedText>

          <TouchableOpacity
            style={[styles.pageButton, { opacity: currentPage === totalPages ? 0.5 : 1 }]}
            disabled={currentPage === totalPages}
            onPress={() => handlePageChange(currentPage + 1)}
          >
            <ThemedText style={styles.pageText}>Next</ThemedText>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.navigationWrapper,
            {
              transform: [{ translateY: tabTranslateY }],
              opacity: tabOpacity,
            },
          ]}
        >
          <NavigationTabs currentScreen="matches" />
        </Animated.View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 5,
  },
  detailsWrapper: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.6,
  },
  button: {
    marginVertical: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  pageText: {
    color: 'white',
  },
  navigationWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 83,
    backgroundColor: '#000',
  },
});
