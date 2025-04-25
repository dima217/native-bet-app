import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { Bet } from '../../types/types';
import { ThemedView } from '../ui/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import MatchLine from '../ui/MatchLine';

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
      <View style={[styles.statusBadge, getStatusStyle()]}>
        <ThemedText style={styles.statusText}>
          {bet.status === 'win' && 'Win'}
          {bet.status === 'lose' && 'Lose'}
          {bet.status === 'during' && 'Active'}
        </ThemedText>
      </View>

      <View style={styles.headerRow}>
        <ThemedText style={styles.tournament}>
          {bet.match.league} {" - "} {bet.match.sportType}
        </ThemedText>
      </View>

      <MatchLine
        teamA={bet.match.teamA}
        teamB={bet.match.teamB}
      />

      <View style={styles.footer}>
        <ThemedText style={styles.dateText}>{bet.match.beginAt}</ThemedText>
        <View style={[styles.amountBubble]}>
          <ThemedText style={[styles.amountText, getAmountColor()]}>
            {bet.status === 'win' && `+ ${bet.amount} gg`}
            {bet.status === 'lose' && `- ${bet.amount} gg`}
            {bet.status === 'during' && `${bet.amount} gg`}
          </ThemedText>
        </View>
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
    position: 'relative',
  },

  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 10,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  win: {
    borderColor: '#FFD700',
  },
  lose: {
    borderColor: '#D32F2F',
  },
  active: {
    borderWidth: 1,
    borderColor: '#388E3C',
  },

  // Турнир и матч
  headerRow: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 8,
  },
  tournament: {
    fontSize: 12,
    color: '#aaa',
  },

  // Низ карточки
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dateText: {
    color: '#888',
    fontSize: 12,
  },

  // GG-ставка
  amountBubble: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'transparent',
  },
  amountText: {
    fontWeight: 'bold',
    fontSize: 14,
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
