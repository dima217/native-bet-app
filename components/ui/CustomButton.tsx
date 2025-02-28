// components/ui/CustomButton.tsx
// components/ui/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
};

export default function CustomButton({
  title,
  onPress,
  loading = false,
  icon,
  variant = 'primary',
  style,
}: ButtonProps) {
  const getColors = () => {
    switch (variant) {
      case 'secondary':
        return ['#FF5A5F', '#FF3B30'] as const;
      case 'outline':
        return ['transparent', 'transparent'] as const;
      default:
        return ['#4A90E2', '#357ABD'] as const;
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getColors()}
        style={[
          styles.button,
          style,
          variant === 'outline' && styles.outline,
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? '#4A90E2' : 'white'} />
        ) : (
          <Text style={[
            styles.text,
            variant === 'outline' && styles.outlineText
          ]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 10,
  },
  outline: {
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: 'transparent',
  },
  outlineText: {
    color: '#4A90E2',
  },
  icon: {
    marginRight: 8,
  },
});