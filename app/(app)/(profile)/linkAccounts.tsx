import React from "react";
import BaseHeader from "@/components/BaseHeader";
import CustomButton from "@/components/ui/Buttons/CustomButton";
import { StatusBar, StyleSheet, View, ScrollView } from "react-native";
import Apple from "../../../assets/images/Icon-Apple.svg";
import Facebook from "../../../assets/images/Icon-Facebook.svg";
import Twitch from "../../../assets/images/Icon-twitch.svg";
import Google from "../../../assets/images/Icon-Google.svg";
import Phone from "../../../assets/images/Icon-Phone.svg";
import Mail from "../../../assets/images/Icon-Mail.svg";

const linkOptions = [
  { title: "Link your Apple account", icon: <Apple width={24} height={24} /> },
  { title: "Link your Twitch account", icon: <Twitch width={24} height={24} /> },
  { title: "Link your Facebook account", icon: <Facebook width={24} height={24} /> },
  { title: "Link your Google account", icon: <Google width={24} height={24} /> },
  { title: "Link your Phone number", icon: <Phone width={24} height={24} /> },
  { title: "Link your Mail address", icon: <Mail width={24} height={24} /> },
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
        {linkOptions.map(({ title, icon }, index) => (
          <CustomButton
            key={index}
            title={title}
            onPress={() => handleLinkPress(title)}
            variant="primary"
            icon={icon} 
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
