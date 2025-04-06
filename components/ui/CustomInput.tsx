import React, { forwardRef, useState, useRef } from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Control, Controller } from 'react-hook-form';

type InputProps = TextInputProps & {
  control: Control<any>;
  name: string;
  label?: string;
  baseLabel?: string;
  error?: string;
  rules?: any;
};

const CustomInput = forwardRef<TextInput, InputProps>(
  ({ control, name, label, baseLabel, error, rules, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <View style={styles.container}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => {
            const showLabelOnTop = isFocused || !!value;

            return (
              <View style={styles.wrapper}>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: error
                        ? '#FF3B30'
                        : isFocused
                        ? '#E5E5E5'
                        : '#E5E5E5AA',
                    },
                  ]}
                >
                 {label && (
                  showLabelOnTop ? (
                <View style={styles.labelWrapper}>
                <View style={styles.labelBackground} />
                 <Text style={styles.label}>{label}</Text>
                </View>
                ) : (
                <Text style={styles.labelInside}>{baseLabel}</Text>
               )
              )}
                  <TextInput
                    ref={ref || inputRef}
                    style={styles.input}
                    onFocus={handleFocus}
                    placeholderTextColor="#E5E5E5"
                    onBlur={() => {
                      handleBlur();
                      onBlur();
                    }}
                    onChangeText={onChange}
                    value={value}
                    {...props}
                  />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>
            );
          }}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  wrapper: {
    position: 'relative',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
    color: '#E5E5E5',
    paddingTop: 10,
    height: '100%',
  },
  labelWrapper: {
    position: 'absolute',
    top: -10,
    left: 20,
    zIndex: 3,
  },
  labelBackground: {
    position: 'absolute',
    top: 6,
    left: -4,
    right: -4,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#001F41',
    zIndex: 1,
  },

  labelInside: {
    position: 'absolute',
    left: 20,
    top: 16,
    fontSize: 17,
    color: '#E5E5E5',
    zIndex: 2,
  },
  label: {
    zIndex: 2,
    fontSize: 13,
    color: '#E5E5E5',
    paddingHorizontal: 4,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 15,
  },
});

export default CustomInput;
