import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

type Props = {
  children: React.ReactNode;
  withScroll?: boolean;
};

export default function ScreenWrapper({ children, withScroll = true }: Props) {
  const Container = withScroll ? ScrollView : View;

  return (
    <LinearGradient
      colors={Colors.dark.gradientBackground}
      start={{ x: 1, y: 0.1 }}
      end={{ x: 0.9, y: 0.9 }}
      locations={[0.3, 0.8]}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <Container
        contentContainerStyle={withScroll ? styles.scrollContainer : undefined}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </Container>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
});