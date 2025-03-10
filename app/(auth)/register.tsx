import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

type FormData = {
  username: string
  email: string
  password: string
  balance: number
}

// RegisterScreen.tsx
export default function RegisterScreen() {
  const router = useRouter();
  const { register: signUp, isLoading } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState('');

  const getErrorMessage = (error: FieldError | undefined): string | undefined => {
    return error?.message;
  };

  const onSubmit = async (data: FormData) => {
    try {
      await signUp({
        username: data.username,
        email: data.email,
        password: data.password,
        balance: Number(data.balance)
      });
      await new Promise(resolve => setTimeout(resolve, 300));
      router.replace('/(app)/matches');
    } catch (err) {
      let errorMessage = 'Registration failed';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create Account
      </ThemedText>
      
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}

      <CustomInput
        control={control}
        name="username"
        label="Username"
        placeholder="Enter username"
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Minimum 3 characters'
          },
          maxLength: {
            value: 20,
            message: 'Maximum 20 characters'
          }
        }}
        error={getErrorMessage(errors.username)}
      />

      <CustomInput
        control={control}
        name="email"
        label="Email"
        placeholder="your@email.com"
        keyboardType="email-address"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid email format'
          }
        }}
        error={getErrorMessage(errors.email)}
      />

      <CustomInput
        control={control}
        name="password"
        label="Password"
        placeholder="••••••••"
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Minimum 6 characters'
          }
        }}
        error={getErrorMessage(errors.password)}
      />

      <CustomInput
        control={control}
        name="balance"
        label="Initial Balance"
        placeholder="0"
        keyboardType="numeric"
        rules={{
          required: 'Initial balance is required',
          min: {
            value: 0,
            message: 'Cannot be negative'
          },
          max: {
            value: 1000000,
            message: 'Maximum €1,000,000'
          }
        }}
        error={getErrorMessage(errors.balance)}
      />

      <CustomButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={styles.button}
      />
      
      <TouchableOpacity 
        onPress={() => router.replace('/(auth)/login')}
        style={styles.linkContainer}
      >
        <ThemedText style={styles.linkText}>
          Already have an account?{' '}
          <ThemedText style={styles.link}>Sign In</ThemedText>
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 28,
    marginBottom: 30, 
    textAlign: 'center',
  },
  error: {
    color: '#ff0000',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    marginTop: 25,
  },
  linkContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  link: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
} as const;