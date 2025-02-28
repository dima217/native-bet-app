import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/ui/ThemedText';
import { Bet } from '../types/types';
import { ThemedView } from './ui/ThemedView';

export const BetCard = ({ bet }: { bet: Bet }) => {

  return (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle">
        {bet.match.teamA} vs {bet.match.teamB}
      </ThemedText>
      
      <ThemedView style={styles.details}>
        <ThemedText>Sum: ${bet.amount}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    gap: 8,
  },
  details: {
    gap: 4,
    marginVertical: 8,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
  },
});