// File: screens/GetCoinsScreen.tsx
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { ThemedText } from "../../components/ui/ThemedText";
import { ThemedView } from "../../components/ui/ThemedView";
import Timer from "../../components/ui/timer";
import VideoAdModal from "../../components/VideoAdModal";
import { useAuth } from "@/hooks/useAuth";
import BaseHeader from "@/components/BaseHeader";
import Coins from "../../assets/images/coins.svg"
import CustomButton from "@/components/ui/Buttons/CustomButton";
import Film from "../../assets/images/film 1.svg"
import { useCooldownStore } from '../../utils/useCooldownStore';
import { router } from "expo-router";

export default function GetCoinsScreen() {
  const { user, updateUserBalance } = useAuth();
  const cooldown = useCooldownStore((s) => s.cooldown);
  const setCooldown = useCooldownStore((s) => s.setCooldown);
  const [showAd, setShowAd] = useState(false);
  const rewardAmount = 1000;

  const handleReward = () => {
    updateUserBalance(rewardAmount);
    setCooldown(60); 
  };

  return (
    <>
      <BaseHeader label="Get coins" goBack={true} />
      <ThemedView style={styles.container}>
        <View style={styles.card}>
          {cooldown > 0 ? (
            <>
              <ThemedText style={styles.subtitle}>
                We're out of coins. Come back in
              </ThemedText>
              <Timer time={cooldown} showHours />
            </>
          ) : (
            <>
              <ThemedText type="title">
                Not enough coins? Get coins for free
              </ThemedText>
              <Coins />
              <CustomButton
                style={styles.getcoins}
                title={'Get coins'}
                onPress={() => setShowAd(true)}
                variant="primary"
                icon={<Film />}
              />
            </>
          )}
        </View>

        <VideoAdModal
          visible={showAd}
          onClose={() => setShowAd(false)}
          onReward={handleReward}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    minHeight: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: "white",
  },
  getcoins: {
    width: '90%',
    marginTop: 10,
  },
  card: {
    backgroundColor: "#1e1e2f",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
  coins: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  amount: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 30,
      color: '#FFEA32',
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  }
});
