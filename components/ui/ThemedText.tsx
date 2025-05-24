import { Colors } from '@/constants/Colors';
import { Text, type TextProps, StyleSheet } from 'react-native';
import {
  useFonts,
} from 'expo-font';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'sfMedium' | 'teamCard';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const [fontsLoaded] = useFonts({
    'SFProText-Medium': require('../../assets/fonts/SFProText-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  const color = Colors.colors.text;

  return (
    <Text
      style={[
        { color },
        type === 'teamCard' && styles.teamCard,
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'sfMedium' && styles.sfMedium,
        style,
      ]}
      {...rest}
    />
  );
}


const styles = StyleSheet.create({
  teamCard: {
    fontSize: 12,
    color: '#ffff',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: '#959595',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  sfMedium: {
    fontFamily: 'SFProText-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#959595',
  },
});
