import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { View } from "react-native";
import Swords from "../../assets/images/Icon.svg";

type Props = {
  team: string;
  index: number;
};

export default function TeamCard({ team, index = 1 }: Props) {
  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.teamContainer,
          index === 1 ? styles.teamFirstCard : styles.teamSecCard,
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
    flex: 1,
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  teamFirstCard: {
    justifyContent: 'flex-end'
  },
  teamSecCard: {
     justifyContent: 'flex-start'
  },
});