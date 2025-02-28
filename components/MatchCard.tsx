import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import { ThemedView } from './ui/ThemedView';
import { Match } from '../types/types';
import { BetModal } from '../components/BetModal';
import { useState } from 'react';

export default function MatchCard({ match }: { match: Match }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">{match.teamA} vs {match.teamB}</ThemedText>
        <ThemedText>Data: {new Date(match.date).toLocaleDateString()}</ThemedText>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <ThemedText type="defaultSemiBold">Lay a Bet</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <BetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        match={match}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  button: {
    marginTop: 12,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
});
