// BackButton.tsx
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../../assets/images/Arrow.svg'

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Arrow width={24} height={21}/>
    </Pressable>
  );
};

