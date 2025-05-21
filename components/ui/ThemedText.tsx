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
  const color = Colors.colors.text;

  useFonts({
    'SFProText-Regular': require('../../assets/fonts/SFProText-Regular.ttf'),
  });

  return (
    <Text
      style={[
        { color },
        type === 'teamCard' ? styles.teamCard : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
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
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#959595',
  },
});
