import React from 'react';
import { StyleSheet, View, Image as RNImage } from 'react-native';
import { SkiaAvatar } from '../SkiaAvatar';
import { ThemedView } from './ThemedView';

type Props = {
  size: number;
  image?: string | null;
};

export default function CustomAvatar({ size, image }: Props) {
  const defaultUri = RNImage.resolveAssetSource(
    require('../../assets/images/Def-Ava.png')
  ).uri;

  return (
    <View style={styles.wrapper}>
      <ThemedView>
        <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
          <SkiaAvatar uri={image || defaultUri} size={size} />
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
