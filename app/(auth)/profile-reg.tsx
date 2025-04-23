// ProfileRegScreen.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm, FieldError } from 'react-hook-form';
import { useState } from 'react';
import { useImagePicker } from '@/hooks/useImagePicker';
import { useAuth } from '@/hooks/useAuth';
import ScreenWrapper from '@/components/BaseWrappers/ScreenWrapper';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import CustomInput from '@/components/ui/Inputs/CustomInput';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import { ImagePickerButton } from '@/components/ImagePickerButton';
import { StyleSheet } from 'react-native';

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function ProfileRegScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const { register, isLoading } = useAuth();
  const [error, setError] = useState('');
  const { image, pickImage } = useImagePicker();
  const router = useRouter();
  const initialBalance = 1000;

  const getErrorMessage = (error: FieldError | undefined) => error?.message;

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      let avatarUrl = null;
  
      if (image) {
        const formData = new FormData();
        formData.append('file', {
          uri: image,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        } as any);
  
        const response = await fetch('http://<YOUR_BACKEND_URL>/image/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const result = await response.json();
        avatarUrl = result.avatarUrl;
      }
  
      await register({
        email,
        username: data.username,
        password: data.password,
        balance: initialBalance,
        image: avatarUrl, 
      });
  
      router.replace('/(app)/matches');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };
  return (
    <ScreenWrapper>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Create Your Profile</ThemedText>

        <ImagePickerButton onPress={pickImage} image={image} />

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}

        <CustomInput
          control={control}
          placeholder="Username"
          name="username"
          rules={{ required: 'Name is required' }}
          error={getErrorMessage(errors.username)}
        />

        <CustomInput
          control={control}
          placeholder="Password"
          name="password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
          }}
          error={getErrorMessage(errors.password)}
        />

        <CustomInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          rules={{
            required: 'Please confirm password',
            validate: (value: string) =>
              value === watch('password') || 'Passwords do not match',
          }}
          error={getErrorMessage(errors.confirmPassword)}
        />

        <CustomButton title="Register" onPress={handleSubmit(onSubmit)} loading={isLoading} />
      </ThemedView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginVertical: 10,
  },
});
