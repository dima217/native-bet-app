// CustomSwitch.tsx
import React from 'react';
import { Pressable, Animated, StyleSheet, View } from 'react-native';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onValueChange }) => {
  const animatedValue = new Animated.Value(value ? 1 : 0);

  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onValueChange(!value);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#444', '#007AFF'],
  });

  return (
    <Pressable onPress={toggleSwitch} style={styles.container}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  track: {
    width: 50,
    height: 30,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
});
