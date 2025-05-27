import BaseHeader from "@/components/BaseHeader";
import { CustomSwitch } from "@/components/ui/CustomSetting";
import { ThemedText } from "@/components/ui/ThemedText";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
    const [isEnabledNotifications, setIsNotificationsEnabled] = useState(true);
    const [isEnabledMatchNotifications, setIsMatchNotificationsEnabled] = useState(true);
    const [isEnabledMusic, setIsMusicEnabled ] = useState(true);

    return (
    <>
    <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />

    <BaseHeader 
    label="Settings"
    goBack={true}
    />

    <View style={styles.switchContainer}>
      <View style={styles.wrapper}>
        <ThemedText style={styles.label}>Notifications </ThemedText>
        <CustomSwitch value={isEnabledNotifications} onValueChange={setIsNotificationsEnabled} />
      </View>
      <View style={styles.wrapper}>
        <ThemedText style={styles.label}>Match notifications </ThemedText>
        <CustomSwitch value={isEnabledMatchNotifications} onValueChange={setIsMatchNotificationsEnabled} />
      </View>
      <View style={styles.wrapper}>
        <ThemedText style={styles.label}>Music</ThemedText>
        <CustomSwitch value={isEnabledMusic} onValueChange={setIsMusicEnabled} />
      </View>
    </View>
    </>
    );
}

const styles = StyleSheet.create({
    switchContainer: {
        marginVertical: 35,
        marginHorizontal: 20
    },
    wrapper: {
      marginVertical: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1e1e2f',
      padding: 16,
      justifyContent: 'space-between',
    },
    label: {
      color: '#fff',
      fontSize: 16,
    },
  });