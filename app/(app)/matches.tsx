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

  const [visibleMatches, setVisibleMatches] = useState<Match[]>([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const batchSize = 15;

  const tabTranslateY = useRef(new Animated.Value(0)).current;
  const tabOpacity = useRef(new Animated.Value(1)).current;
  const lastOffsetY = useRef(0);

  useEffect(() => {
    if (user) refreshMatches();
  }, [user, refreshMatches]);

  const getFilteredMatches = (allMatches: Match[]) => {
    return allMatches.filter((match) => {
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
  };

  useEffect(() => {
    const filtered = getFilteredMatches(matches);
    const initialBatch = filtered.slice(0, batchSize);
    setVisibleMatches(initialBatch);
  }, [matches, selectedFilter, selectedGameId]);

  const loadMoreMatches = () => {
    if (loadMoreLoading) return;

    const filtered = getFilteredMatches(matches);
    const currentLength = visibleMatches.length;

    if (currentLength >= filtered.length) return;

    setLoadMoreLoading(true);

    const nextBatch = filtered.slice(currentLength, currentLength + batchSize);
    setTimeout(() => {
      setVisibleMatches((prev) => [...prev, ...nextBatch]);
      setLoadMoreLoading(false);
    }, 500); 
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY > lastOffsetY.current + 10) {
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
            data={visibleMatches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MatchCard match={item} onPress={() => setSelectedMatch(item)} />
            )}
            contentContainerStyle={[
              styles.list
            ]}            
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshMatches} />}
            ListEmptyComponent={
              <ThemedText style={styles.empty}>
                {error || 'No available matches'}
              </ThemedText>
            }
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onEndReached={loadMoreMatches}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadMoreLoading ? (
                <ThemedText style={{ textAlign: 'center', padding: 10 }}>Loading more...</ThemedText>
              ) : null
            }
          />
        )}

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
    paddingTop: 45,
    paddingBottom: 70,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.6,
  },
  button: {
    position: 'absolute',
    top: 80, 
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#090C15', 
    paddingVertical: 10,
    paddingHorizontal: 10,
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
