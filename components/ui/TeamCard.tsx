import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { View } from "react-native";
import Swords from "../../assets/images/Icon.svg";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  team: string;
  index: number;
};


export default function TeamCard({ team, index = 1 }: Props) {
  const cardBorder = useThemeColor({}, 'border');
  
  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.teamContainer,
          {borderColor: cardBorder},

          { flexDirection: index === 1 ? "row" : "row-reverse" }
        ]}
      >
        <ThemedText>{team}</ThemedText>
        <Swords height={24} width={24} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  teamContainer: {
    height: 58,
    backgroundColor: 'transparent',
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    justifyContent: 'flex-end'
  }
});