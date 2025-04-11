import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Match } from '@/types/types';
import { ThemedView } from './ui/ThemedView';
import { ThemedText } from './ui/ThemedText';
import MatchLine from './ui/MatchLine';
import CustomButton from './ui/CustomButton';
import Clock from '../assets/images/clock 1.svg';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function MatchDetailsCard({
  match,
  onBack,
}: {
  match: Match;
  onBack: () => void;
})
{
const cardColor = useThemeColor({}, 'cardBackground');

return (
    <ThemedView style={[
        styles.card,
        { backgroundColor: cardColor }
      ]}>
      <View style={styles.header}>
        <ThemedText type="subtitle">{match.sportType.toUpperCase()}</ThemedText>
      </View>

      <MatchLine teamA={match.teamA} teamB={match.teamB} />

      <CustomButton title="Draw" onPress={() => {}} style={styles.drawButton} />

      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ThemedText>← Back</ThemedText>
      </TouchableOpacity>

      <View style={styles.time}>
        <Clock width={12} height={12} />
        <ThemedText>{'2h 5min'}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    paddingBottom: 0,
    marginVertical: 12,
    marginHorizontal: 8,
    borderWidth: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  drawButton: {
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
