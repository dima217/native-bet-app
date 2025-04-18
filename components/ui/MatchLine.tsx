import { SportType } from "@/types/types";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from 'react-native';
import { center } from "@shopify/react-native-skia";
import { ThemedText } from '@/components/ui/ThemedText';
import TeamCard from './TeamCard';

type Props = {
    teamA: string,
    teamB: string,
}
export default function MatchLine({teamA, teamB} : Props) {
    const cardColor = useThemeColor({}, 'cardBackground');

    return (
        <ThemedView
          style={[
             styles.lineStile,
            { backgroundColor: cardColor }
          ]}
        >
        <TeamCard
        team={teamA}
        index={1}
         />
        <ThemedText
          type="subtitle"
          style={
            styles.label
          }
        >
            VS
        </ThemedText>
        <TeamCard
        team={teamB}
        index={2}
         />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    lineStile: {
        height: 58,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
,    },
      label: {
        paddingHorizontal: 10,
      }
})