import { Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import Swords from "../../assets/images/Icon.svg";
import { useThemeColor } from "@/hooks/useThemeColor";


type Props = {
  team: string;
  index: number;
  selected?: boolean;
  selectable?: boolean;
  onPress?: () => void;
};

export default function TeamCard({ team, index = 1, selected, selectable, onPress }: Props) {
  const cardBorder = useThemeColor({}, "border");
  const selectedColor = useThemeColor({}, "tint");

  const content = (
    <View
      style={[
        styles.teamContainer,
        { borderColor: selected ? selectedColor : cardBorder },
        { flexDirection: index === 1 ? "row" : "row-reverse" },
        selected && styles.selected,
      ]}
    >
      <ThemedText style={styles.teamName}>{team}</ThemedText>
      <Swords height={24} width={24} />
    </View>
  );

  if (selectable) {
    return (
      <Pressable style={styles.container} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return <View style={styles.container}>{content}</View>;
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  teamContainer: {
    height: 65,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    justifyContent: "flex-end",
  },
  selected: {
    borderWidth: 2,
  },
  teamName: {
    fontSize: 12,
    flexShrink: 1,
    flexWrap: 'wrap',
  },  
});
