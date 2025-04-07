import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import Logo from '../../assets/images/Logo.svg'
import ScreenWrapper from "@/components/ScreenWrapper";

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
    <ScreenWrapper>
    <ThemedView style={styles.innerContainer}>
    
    <Logo width={223} height={96} style={styles.image}/>

      {error && <ThemedText style={styles.error}>{error}</ThemedText>}


      <CustomInput
        control={control}
        label="Email"
        baseLabel="Your email"
        name="email"
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

      <CustomButton
        title="Enter"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={styles.button}
      />

      <ThemedText style={styles.social}>
          or use social accounts
      </ThemedText>

    </ThemedView>
    <TouchableOpacity 
        onPress={() => router.replace('/(auth)/login')}
        style={styles.linkContainer}
      >
        <ThemedText style={styles.linkText}>
        By signing in the app you agree with&accept {' '}
          <ThemedText style={styles.link}>Terms and Conditions</ThemedText>
        </ThemedText>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 45,
    paddingTop: 0,
  },

  innerContainer: { 
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    padding: 20,
  },

  image: {
    alignSelf: 'center', 
    marginBottom: 20, 
    resizeMode: 'contain',
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
    marginBottom: 50,
    alignItems: 'center',
  },
  linkText: {
    color: '#E5E5E5',
    fontSize: 10,
  },
  link: {
    color: '#E5E5E5',
    fontSize: 10,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  social: {
    alignSelf: 'center',
    marginTop: 10,
  }
} as const;