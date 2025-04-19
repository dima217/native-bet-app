import { SportType } from "@/types/types";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from 'react-native';
import { center } from "@shopify/react-native-skia";
import { ThemedText } from '@/components/ui/ThemedText';
import TeamCard from './TeamCard';

type Props = {
  teamA: string;
  teamB: string;
  votedTeam?: string;
  selectable?: boolean;
  onSelectTeam?: (team: string) => void;
};

export default function MatchLine({
  teamA,
  teamB,
  votedTeam,
  selectable = false,
  onSelectTeam,
}: Props) {
  const cardColor = useThemeColor({}, "cardBackground");

  const handleSelect = (team: string) => {
    if (selectable && onSelectTeam) {
      onSelectTeam(team);
    }
  };

  return (
    <ThemedView style={[styles.lineStile, { backgroundColor: cardColor }]}>
      <TeamCard
        team={teamA}
        index={1}
        selected={votedTeam === teamA}
        onPress={() => handleSelect(teamA)}
        selectable={selectable}
      />
      <ThemedText type="subtitle" style={styles.label}>VS</ThemedText>
      <TeamCard
        team={teamB}
        index={2}
        selected={votedTeam === teamB}
        onPress={() => handleSelect(teamB)}
        selectable={selectable}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  lineStile: {
    paddingHorizontal: 5,
    height: 58,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  label: {
    paddingHorizontal: 10,
  },
});