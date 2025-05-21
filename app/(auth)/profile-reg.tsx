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
import axios from 'axios';
import { SkiaAvatar } from '../../components/SkiaAvatar';

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
      var imageUrl = '';
      if (image) {
        const formData = new FormData();
        formData.append('file', {
          uri: image,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        } as any);
  
        const response = await axios.post('/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });        
  
        const result = response.data.avatarUrl;
        imageUrl = result;
      }
  
      await register({
        username: data.username,
        email: email,
        password: data.password,
        balance: initialBalance,
        avatarUrl: imageUrl, 
      });
    } catch (err: unknown) {
      if (err instanceof Error)
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
         rules={{
            required: 'Username is required',
            minLength: { value: 4, message: 'At least 4 characters' },
            maxLength: {
              value: 25,
              message: 'Name cannot exceed 25 characters'
            },
            pattern: {
            value: /^[A-Za-z]+$/,
            message: 'Only letters are allowed (no numbers or special characters)',
          },
       }}
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
