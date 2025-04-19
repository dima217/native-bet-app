import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ui/ThemedText';
import { ThemedView } from '../ui/ThemedView';
import { Match } from '../../types/types';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import MatchLine from '../ui/MatchLine';
import Clock from '../../assets/images/clock 1.svg'
import { useUserBetsContext } from '@/contexts/UserBetsContext';

export default function MatchCard({ match, onPress }: { match: Match, onPress: () => void }) {
  const { bets } = useUserBetsContext();
  const [modalVisible, setModalVisible] = useState(false);
  const iconColor = useThemeColor({}, 'tint');
  const cardColor = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'border');
  const tintColor = useThemeColor({}, 'tint');

  const userBet = bets.find((bet) => bet.match.id === match.id);

  return (
    <TouchableOpacity
     onPress={onPress}
     disabled={!!userBet} 
    >
  <ThemedView 
    style={[
      styles.card,
      { backgroundColor: cardColor }
    ]}
  >
    {userBet && (
      <View style={[styles.votedBadge, { borderColor: tintColor }]}>
        <ThemedText style={{ color: tintColor, fontSize: 12 }}>Voted</ThemedText>
      </View>
    )}

    <View style={styles.header}>
      <ThemedText type="subtitle" style={styles.sportTitle}>
        {match.sportType.toUpperCase()}
      </ThemedText>
    </View>

    <MatchLine 
      teamA={match.teamA}
      teamB={match.teamB}
      votedTeam={userBet?.team}
    />

    <View style={styles.footer}>
      <View style={styles.time}>
        <Clock width={12} height={12}/>
        <ThemedText>30sec</ThemedText>
      </View>
    </View>
  </ThemedView>
</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  time: {
    marginTop: 20,
    backgroundColor: 'black',
    width: 88,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  card: {
    height: 165,
    padding: 5,
    paddingBottom: 0,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  votedBadge: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 2,
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportTitle: {
    letterSpacing: 1,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  team: {
    fontSize: 18,
    maxWidth: '40%',
    textAlign: 'center',
  },

  divider: {
    height: 1,
    marginVertical: 12,
    opacity: 0.3,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 14,
  },
});