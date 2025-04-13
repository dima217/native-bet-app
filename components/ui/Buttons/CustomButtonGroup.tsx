import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';

type Props = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  style?: ViewStyle;
};

export default function CustomButtonGroup({ options, selected, onSelect, style }: Props) {
  const theme = useColorScheme();
  const primaryColor = theme === 'dark' ? '#0166FE' : '#4A90E2';

  return (
    <View style={[styles.container, { borderColor: primaryColor }]}>
      {options.map((option, index) => {
        const isActive = selected === option;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.button,
              {
                backgroundColor: isActive ? primaryColor : 'transparent',
                borderTopLeftRadius: isFirst ? 25 : 0,
                borderBottomLeftRadius: isFirst ? 25 : 0,
                borderTopRightRadius: isLast ? 25 : 0,
                borderBottomRightRadius: isLast ? 25 : 0,
              },
              
              style,

              index !== 0 && { borderLeftWidth: 1, borderLeftColor: primaryColor },
            ]}
            onPress={() => onSelect(option)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.text,
                { color: '#fff'},
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});
