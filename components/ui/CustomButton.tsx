// components/ui/CustomButton.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  ViewStyle, 
  useColorScheme 
} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
};

export default function CustomButton({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  style,
}: ButtonProps) {
  const theme = useColorScheme();
  
  const baseColors = {
    primary: theme === 'dark' ? '#0166FE' : '#4A90E2',
    secondary: '#FF5A5F',
    outline: 'transparent',
  };

  const textColors = {
    primary: 'white',
    secondary: 'white',
    outline: theme === 'dark' ? '#bb86fc' : '#4A90E2',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: baseColors[variant],
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: theme === 'dark' ? '#bb86fc' : '#4A90E2',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : (
        <Text style={[styles.text, { color: textColors[variant] }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    height: 50,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});