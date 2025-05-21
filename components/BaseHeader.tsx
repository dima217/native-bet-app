import { ThemedText } from "../components/ui/ThemedText";
import MoneyBag from '../assets/images/Money bag.svg';
import { ThemedView } from "./ui/ThemedView";
import { StyleSheet } from "react-native";
import { BackButton } from "./ui/Buttons/BackButton";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  label: string;
  goBack?: boolean;
};

export default function BaseHeader({ label, goBack = false }: Props) {
  const { user } = useAuth();

  if (goBack) {
    return (
      <ThemedView style={styles.containerWithBack}>
        <BackButton />

        <ThemedText type="title" style={styles.titleCenter}>
          {label}
        </ThemedText>

        <ThemedView style={styles.money}>
          <ThemedText>{user?.balance}</ThemedText>
          <MoneyBag width={35} height={35} />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{label}</ThemedText>

      <ThemedView style={styles.money}>
        <ThemedText>{user?.balance}</ThemedText>
        <MoneyBag width={35} height={35} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  containerWithBack: {
    marginTop: 45,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleCenter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  money: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
