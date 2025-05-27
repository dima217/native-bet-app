import BaseHeader from "@/components/BaseHeader";
import CustomButton from "@/components/ui/Buttons/CustomButton";
import CustomInput from "@/components/ui/Inputs/CustomInput";
import { ImagePickerButton } from "@/components/ImagePickerButton";
import { ThemedView } from "@/components/ui/ThemedView";
import { useImagePicker } from "@/hooks/useImagePicker";
import { FieldError, useForm } from "react-hook-form";
import { Alert, StatusBar, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import { useState } from "react";
import { Image as RNImage } from "react-native";
import { API_URL } from "@/config";
import api from "@/api/api";

type FormData = {
  username: string;
};

export default function EditProfileScreen() {
  const { user, isLoading } = useAuth(); 

  const defaultUri = RNImage.resolveAssetSource(
    require("../../../assets/images/Def-Ava.png")
  ).uri;

  const { image, pickImage } = useImagePicker();
  const displayedImage = image || (user?.avatarUrl ? `${API_URL}${user.avatarUrl}` : defaultUri);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username: user?.username || '',
    }
  });

  const [error, setError] = useState('');

  const getErrorMessage = (error: FieldError | undefined): string | undefined => {
    return error?.message;
  };

  const onSubmit = async (data: FormData) => {
    try {
      let avatarUrl = user?.avatarUrl || '';   

      if (image) {
        const formData = new FormData();
        formData.append('file', {
          uri: image,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        } as any);

        const response = await api.post('/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        avatarUrl = response.data.avatarUrl;
      }

      await api.put('/users/profile/update', {
        username: data.username,
        avatarUrl,
      });

      Alert.alert("Success", "Profile updated successfully!");
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    }
  };

  if (isLoading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />

      <BaseHeader label='Edit account' goBack />

      <ThemedView style={styles.innerContainer}>
        <ImagePickerButton onPress={pickImage} image={displayedImage} />

        <CustomInput
          control={control}
          name="username"
          placeholder="Username"
          rules={{
            minLength: {
              value: 2,
              message: 'Name must be at least 4 characters'
            },
            maxLength: {
              value: 25,
              message: 'Name cannot exceed 25 characters'
            },
            pattern: {
              value: /^[\p{L}\s'-.]{2,50}$/u,
              message: 'Invalid name format'
            }
          }}
          error={getErrorMessage(errors.username)}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <CustomButton title="Save changes" onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 50,
    paddingHorizontal: 45,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
