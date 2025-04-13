import BaseHeader from "@/components/BaseHeader";
import CustomButton from "@/components/ui/Buttons/CustomButton";
import { StatusBar, StyleSheet, View, ScrollView } from "react-native";

const linkOptions = [
  { title: "Link your Apple account" },
  { title: "Link your Twitch account" },
  { title: "Link your Facebook account" },
  { title: "Link your Google account" },
  { title: "Link your Phone number" },
  { title: "Link your Mail address" },
];

export default function LinkAccountsScreen() {
  const handleLinkPress = (title: string) => {
    console.log(`Pressed: ${title}`);
  };

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />
      <BaseHeader label="Link accounts" goBack={true} />
      <ScrollView contentContainerStyle={styles.container}>
        {linkOptions.map(({ title }, index) => (
          <CustomButton
            key={index}
            title={title}
            onPress={() => handleLinkPress(title)}
            variant="primary"
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 45,
  },
});
