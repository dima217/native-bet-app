import { SportType } from "@/types/types";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from 'react-native';
import { center } from "@shopify/react-native-skia";
import { ThemedText } from '../../app-example/components/ThemedText';

type Props = {
    sportType: SportType,
    teamA: string,
    teamB: string,
}
export default function MatchLine({sportType, teamA, teamB} : Props) {
    const cardColor = useThemeColor({}, 'cardBackground');

    return (
        <ThemedView
          style={[
             styles.lineStile,
            { backgroundColor: cardColor }
          ]}
        >
        <ThemedText>
            VS
        </ThemedText>
        
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    lineStile: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        padding: 20,
    }
})