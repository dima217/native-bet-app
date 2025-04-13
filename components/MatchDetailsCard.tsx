import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Match } from '@/types/types';
import { ThemedView } from './ui/ThemedView';
import { ThemedText } from './ui/ThemedText';
import MatchLine from './ui/MatchLine';
import CustomButton from './ui/CustomButton';
import Clock from '../assets/images/clock 1.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import BetKeyboard from '../components/BetKeyBoard'; 

export default function MatchDetailsCard({
  match,
  onBack,
}: {
  match: Match;
  onBack: () => void;
}) {
  const cardColor = useThemeColor({}, 'cardBackground');
  const [showKeyboard, setShowKeyboard] = useState(false);

  return (
    <>
      <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{match.sportType.toUpperCase()}</ThemedText>
        </View>

        <MatchLine teamA={match.teamA} teamB={match.teamB} />

      {showKeyboard ? (
        <BetKeyboard 
          style={styles.keyBoard}
          onCancel={() => setShowKeyboard(false)} 
          onConfirm={(amount) => {
            // place bet logic here
            console.log('Voted with', amount);
            setShowKeyboard(false);
          }} 
        />
      ) : 
      <CustomButton 
          title="Draw" 
          onPress={() => setShowKeyboard(true)} 
          style={styles.drawButton} 
        />
      }

        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ThemedText>← Back</ThemedText>
        </TouchableOpacity>

        <View style={styles.time}>
          <Clock width={12} height={12} />
          <ThemedText>{'2h 5min'}</ThemedText>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 8,
    paddingBottom: 0,
    marginVertical: 12,
    marginHorizontal: 8,
    borderWidth: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  keyBoard: {
    marginTop: 30,
  },
  drawButton: {
    borderWidth: 1,
    borderColor: '#666C7C',
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginVertical: 12,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 88,
    height: 25,
    borderRadius: 4,
    alignSelf: 'center',
    gap: 4,
  },
  backButton: {
    marginBottom: 5,
    alignSelf: 'center',
  },
});
