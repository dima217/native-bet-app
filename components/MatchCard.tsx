import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import { ThemedView } from './ui/ThemedView';
import { Match } from '../types/types';
import { BetModal } from '../components/BetModal';
import { useState } from 'react';
import CustomButton from './ui/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function MatchCard({ match }: { match: Match }) {
  const [modalVisible, setModalVisible] = useState(false);
  const iconColor = useThemeColor({}, 'tint');
  const cardColor = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'border');

  return (
    <>
      <ThemedView 
        style={[
          styles.card,
          { backgroundColor: cardColor }
        ]}
      >
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.sportTitle}>
            {match.sportType.toUpperCase()}
          </ThemedText>
        </View>

        <View style={styles.teamsContainer}>
          <ThemedText type="defaultSemiBold" style={styles.team}>
            {match.teamA}
          </ThemedText>
          <ThemedText type="default" style={styles.vsText}>VS</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.team}>
            {match.teamB}
          </ThemedText>
        </View>

        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={16} color={iconColor} />
            <ThemedText style={styles.detailText}>
              {new Date(match.date).toLocaleDateString()}
            </ThemedText>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={16} color={iconColor} />
            <ThemedText style={styles.detailText}>
              {new Date(match.date).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </ThemedText>
          </View>
        </View>

        <CustomButton
          title="Place a Bet"
          onPress={() => setModalVisible(true)}
        />
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
    padding: 20,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
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
  vsText: {
    fontSize: 12,
    color: '#888',
    marginHorizontal: 8,
  },
  divider: {
    height: 1,
    marginVertical: 12,
    opacity: 0.3,
  },
  detailsContainer: {
    gap: 10,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
});