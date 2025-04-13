import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { ThemedView } from '../../components/ui/ThemedView';
import CustomButton from '../../components/ui/Buttons/CustomButton';
import CustomInput from '../../components/ui/Inputs/CustomInput';
import { useAuth } from '../../hooks/useAuth';

type FormValues = {
  email: string;
};

export default function ForgotPasswordScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const { forgotPassword } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email);
      setMessage('Check your email for reset instructions');
      setTimeout(() => router.back(), 3000);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Reset Password
      </ThemedText>

      <CustomInput
        control={control}
        name="email"
        label="Email"
        placeholder="your@email.com"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid email format'
          }
        }}
        error={errors.email?.message}
      />

      {message && (
        <ThemedText style={styles.message}>{message}</ThemedText>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <CustomButton
          title="Send Reset Link"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  message: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#4A90E2',
  },
});