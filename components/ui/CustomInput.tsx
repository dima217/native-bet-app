import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, Text, View, StyleSheet } from 'react-native';
import { Control, Controller } from 'react-hook-form';

type InputProps = TextInputProps & {
  control: Control<any>;
  name: string;
  label?: string;
  error?: string; 
  rules?: any;
};

const CustomInput = forwardRef<TextInput, InputProps>(
  ({ control, name, label, error, rules, ...props }, ref) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                ref={ref}
                style={styles.input}
                placeholderTextColor="#E5E5E5"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                {...props}
              />
            </View>
          )}
        />
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  label: {
    color: '#E5E5E5',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#E5E5E5',
    paddingVertical: 0, 
  },
  icon: {
    marginRight: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 5,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default CustomInput;