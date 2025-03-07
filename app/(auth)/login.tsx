import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { ThemedView } from '../../components/ui/ThemedView';
import CustomButton from '../../components/ui/CustomButton';
import CustomInput from '../../components/ui/CustomInput';
import { useAuth } from '../../hooks/useAuth';

type FormValues = {
    email: string;
    password: string;
  };
  
  export default function LoginScreen() {
    const { 
      control, 
      handleSubmit, 
      formState: { errors } 
    } = useForm<FormValues>();
    
    const { user, login, isLoading, checkAuth } = useAuth();
    const router = useRouter();
    const [authError, setAuthError] = useState('');
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    useEffect(() => {
      const verifyToken = async () => {
        try {
          await checkAuth();
        } catch (error) {
          console.log('Auth check failed');
        }
      };
      
      if (!user) verifyToken();
    }, []); 

  const handleAuth = async (data: FormValues) => {
    setAuthError('');
    try {
      if (activeTab === 'login') {
        await login(data.email, data.password);
      } else {
        router.push('/(auth)/register');
      }
    } catch (error) {
      let errorMessage = 'Authentication failed';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setAuthError(errorMessage);
    }
  };

  const getErrorMessage = (error: FieldError | undefined): string | undefined => {
    return error?.message;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome Back
      </ThemedText>

      {authError && (
        <ThemedText style={styles.error}>{authError}</ThemedText>
      )}

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

      {isLoading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <>
          <CustomButton
            title="Sign In"
            onPress={handleSubmit(handleAuth)}
            style={styles.mainButton}
          />
          
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/register')}
            style={styles.linkContainer}
          >
            <ThemedText style={styles.linkText}>
              Don't have an account?{' '}
              <ThemedText style={styles.link}>Sign Up</ThemedText>
            </ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
  },
  link: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },
  tabButton: {
    flex: 1,
  },
  mainButton: {
    marginTop: 20,
  },
  socialButton: {
    marginTop: 15,
  },
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
  },

  registerText: {
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
  },
  divider: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#999',
  },
});