// PasswordScreen.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm, FieldError } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import ScreenWrapper from '@/components/BaseWrappers/ScreenWrapper';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import CustomInput from '@/components/ui/Inputs/CustomInput';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import { StyleSheet } from 'react-native';

type FormData = {
  password: string;
};

export default function PasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await login(email, data.password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const getErrorMessage = (error: FieldError | undefined) => error?.message;

  return (
    <ScreenWrapper>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Welcome back</ThemedText>
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        <CustomInput
          control={control}
          name="password"
          secureTextEntry
          placeholder="••••••••"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'At least 6 characters',
            },
          }}
          error={getErrorMessage(errors.password)}
        />
        <CustomButton title="Login" loading={isLoading} onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    padding: 45,
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: 'center',
  },
  error: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 15,
  },
});
