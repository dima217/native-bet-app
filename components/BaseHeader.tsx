import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../components/ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";
import { BackButton } from "./ui/Buttons/BackButton";
import MoneyBag from "../assets/images/Money bag.svg";
import { useAuth } from "@/hooks/useAuth";
import { router, usePathname } from "expo-router";

type Props = {
  label: string;
  goBack?: boolean;
};

export default function BaseHeader({ label, goBack = false }: Props) {
  const { user } = useAuth();

  const pathname = usePathname();

  const handleOpenGetCoins = () => {
    if (!pathname.includes("get-coins")) {
      router.push("/(app)/get-coins");
    }    
  };

  const HeaderContent = () => (
    <>
      <ThemedText type="title" style={goBack ? styles.titleCenter : undefined}>
        {label}
      </ThemedText>
      <ThemedView style={styles.money}>
        <ThemedText>{user?.balance ?? 0} gg</ThemedText>
        <TouchableOpacity onPress={handleOpenGetCoins}>
          <MoneyBag width={35} height={35} />
        </TouchableOpacity>
      </ThemedView>
    </>
  );

  return (
    <ThemedView style={goBack ? styles.containerWithBack : styles.container}>
      {goBack && <BackButton />}
      <HeaderContent />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  containerWithBack: {
    marginTop: 45,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleCenter: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
  },
  money: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
});
