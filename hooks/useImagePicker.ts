// hooks/useImagePicker.ts
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const useImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Access to gallery rejected!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:  ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return {
    image,
    pickImage,
  };
};
