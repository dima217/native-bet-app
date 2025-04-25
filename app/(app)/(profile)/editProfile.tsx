import BaseHeader from "@/components/BaseHeader";
import CustomButton from "@/components/ui/Buttons/CustomButton";
import CustomInput from "@/components/ui/Inputs/CustomInput";
import { ImagePickerButton } from "@/components/ImagePickerButton";
import { ThemedView } from "@/components/ui/ThemedView";
import { useImagePicker } from "@/hooks/useImagePicker";
import { FieldError, useForm } from "react-hook-form";
import { Alert, StatusBar, StyleSheet, Text } from 'react-native';
import axios from "axios";
import { useAuth } from '../../../hooks/useAuth';
import { useState } from "react";
import { Image as RNImage } from "react-native";

type FormData = {
  username: string;
};

export default function EditProfileScreen() {
  const { user } = useAuth(); 

  const defaultUri = RNImage.resolveAssetSource(
    require("../../../assets/images/Def-Ava.png")
  ).uri;

  const { image, pickImage } = useImagePicker();
  const displayedImage = image || user?.avatarUrl || defaultUri;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState('');


  const getErrorMessage = (error: FieldError | undefined): string | undefined => {
    return error?.message;
  };

  const onSubmit = async (data: FormData) => {
    try {
     var avatarUrl = '';   
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
      avatarUrl = result;
    }
      await axios.put(
        '/users/profile/update',
        {
          id: user?.id,
          username: data.username,
          avatarUrl: avatarUrl,
        },
      );
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    }
  };

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
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            },
            maxLength: {
              value: 50,
              message: 'Name cannot exceed 50 characters'
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
});
