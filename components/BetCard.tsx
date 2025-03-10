import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../components/ui/ThemedText';
import { Bet } from '../types/types';
import { ThemedView } from './ui/ThemedView';

export default function BetCard({ bet }: { bet: Bet }) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Bet Details</ThemedText>
      </View>

      <View style={styles.details}>
        <ThemedText style={styles.label}>Amount:</ThemedText>
        <ThemedText style={styles.amount}>${bet.amount}</ThemedText>
      </View>

      <View style={[styles.status, bet.status === 'win' ? styles.win : styles.lose]}>
        <ThemedText style={styles.statusText}>{bet.status.toUpperCase()}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C2C2E',
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
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    paddingBottom: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    color: '#A1A1A1',
    fontSize: 14,
  },
  amount: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  win: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
  },
  lose: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
