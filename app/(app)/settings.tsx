import BaseHeader from "@/components/BaseHeader";
import { CustomSwitch } from "@/components/ui/CustomSetting";
import { ThemedText } from "@/components/ui/ThemedText";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
    <>
    <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />

    <BaseHeader label="Settings"/>

    <View style={styles.switchContainer}>
      <View style={styles.wrapper}>
        <ThemedText style={styles.label}>Notifications </ThemedText>
        <CustomSwitch value={isEnabled} onValueChange={setIsEnabled} />
      </View>
      <View style={styles.wrapper}>
        <ThemedText style={styles.label}>Match notifications </ThemedText>
        <CustomSwitch value={isEnabled} onValueChange={setIsEnabled} />
      </View>
      <View style={styles.wrapper}>
        <ThemedText style={styles.label}>Music</ThemedText>
        <CustomSwitch value={isEnabled} onValueChange={setIsEnabled} />
      </View>
    </View>
    </>
    );
}

const styles = StyleSheet.create({
    switchContainer: {
        marginVertical: 150,
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