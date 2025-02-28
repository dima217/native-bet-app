import { View } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...props
}: View['props'] & {
  lightColor?: string;
  darkColor?: string;
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...props} />;
}