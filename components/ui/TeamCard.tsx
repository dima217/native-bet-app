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
    padding: 5,
  },
  teamContainer: {
    height: 58,
    backgroundColor: 'transparent',
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    gap: 10,
    justifyContent: 'flex-end'
  }
});