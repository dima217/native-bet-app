import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../components/ui/ThemedText';
import { Bet } from '../types/types';
import { ThemedView } from './ui/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import MatchLine from './ui/MatchLine';

export default function BetCard({ bet }: { bet: Bet }) {
  const cardBackground = useThemeColor({}, 'cardBackground');

  const getStatusStyle = () => {
    if (bet.status === 'win') return styles.win;
    if (bet.status === 'lose') return styles.lose;
    return styles.active;
  };

  const getAmountColor = () => {
    if (bet.status === 'win') return styles.amountWin;
    if (bet.status === 'lose') return styles.amountLose;
    return styles.amountNeutral;
  };

  return (
    <ThemedView style={[styles.card, { backgroundColor: cardBackground }]}>
      <View style={styles.topRow}>
        <View style={[styles.statusBadge, getStatusStyle()]}>
          <ThemedText style={styles.statusText}>
            {bet.status === 'win' && 'Win'}
            {bet.status === 'lose' && 'Lose'}
            {bet.status === 'active' && 'Active'}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.tournament}>
        {bet.match.date} 
      </ThemedText>

      <MatchLine
        teamA={bet.match.teamA}
        teamB={bet.match.teamB}
      />

      <View style={styles.footer}>
        <ThemedText style={styles.dateText}>{bet.match.date}</ThemedText>
        <ThemedText style={[styles.amountText, getAmountColor()]}>
          {bet.status === 'win' && `+ ${bet.amount} gg`}
          {bet.status === 'lose' && `- ${bet.amount} gg`}
          {bet.status === 'active' && `${bet.amount} gg`}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  win: {
    backgroundColor: '#FFD700',
  },
  lose: {
    backgroundColor: '#D32F2F',
  },
  active: {
    backgroundColor: '#388E3C',
  },
  streak: {
    color: '#FFD700',
    fontWeight: '600',
  },
  tournament: {
    color: '#aaa',
    fontSize: 12,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: '#888',
  },
  amountText: {
    fontWeight: 'bold',
  },
  amountWin: {
    color: '#FFD700',
  },
  amountLose: {
    color: '#F44336',
  },
  amountNeutral: {
    color: '#aaa',
  },
});
