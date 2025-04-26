import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import TeamCard from './TeamCard';

type Props = {
  teamA: string;
  teamB: string;
  teamAImage?: string;
  teamBImage?: string;
  votedTeam?: string;
  selectable?: boolean;
  onSelectTeam?: (team: string) => void;
};

export default function MatchLine({
  teamA,
  teamB,
  teamAImage,
  teamBImage,
  votedTeam,
  selectable = false,
  onSelectTeam,
}: Props) {
  const cardColor = useThemeColor({}, 'cardBackground');

  const handleSelect = (team: string) => {
    if (selectable && onSelectTeam) {
      onSelectTeam(team);
    }
  };

  return (
    <ThemedView style={[styles.lineStyle, { backgroundColor: cardColor }]}>
      <TeamCard
        team={teamA}
        image={teamAImage}
        index={1}
        selected={votedTeam === teamA}
        onPress={() => handleSelect(teamA)}
        selectable={selectable}
      />
      <ThemedText type="subtitle" style={styles.label}>
        VS
      </ThemedText>
      <TeamCard
        team={teamB}
        image={teamBImage}
        index={2}
        selected={votedTeam === teamB}
        onPress={() => handleSelect(teamB)}
        selectable={selectable}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  lineStyle: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    paddingHorizontal: 10,
  },
});
