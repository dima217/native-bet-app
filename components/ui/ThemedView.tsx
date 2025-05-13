import React from 'react';
import { View, ViewProps } from 'react-native';
import { Colors } from '../../constants/Colors';

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...props
}: ThemedViewProps) {
  const backgroundColor = Colors.colors.background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}
