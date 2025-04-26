import React from 'react';
import { Canvas, Image as SkiaImage, useImage } from '@shopify/react-native-skia';
import { Image as RNImage } from 'react-native';

type SkiaAvatarProps = {
  uri: string;
  size: number;
};

export const SkiaAvatar = ({ uri, size }: SkiaAvatarProps) => {
  const image = useImage(uri);

  const defaultPlaceholder = require('../assets/images/Def-Ava.png');

  if (!image) {
    return (
      <RNImage
        source={defaultPlaceholder}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        resizeMode="cover"
      />
    );
  }

  const srcWidth = image.width();
  const srcHeight = image.height();

  const scale = Math.min(size / srcWidth, size / srcHeight);
  const xOffset = (size - srcWidth * scale) / 2;
  const yOffset = (size - srcHeight * scale) / 2;

  return (
    <Canvas style={{ width: size, height: size }}>
      <SkiaImage
        image={image}
        x={xOffset}
        y={yOffset}
        width={srcWidth * scale}
        height={srcHeight * scale}
      />
    </Canvas>
  );
};
