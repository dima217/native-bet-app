import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Arrow from '../../../assets/images/Arrow.svg';

export const BackButton = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()}>
      <Arrow width={24} height={21} />
    </Pressable>
  );
};
