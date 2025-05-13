import React, { memo, useMemo } from 'react';
import { Canvas, Image as SkiaImage, useImage } from '@shopify/react-native-skia';
import { ImageStyle, StyleProp } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

type SkiaAvatarProps = {
  uri: string;
  size: number;
};

export const SkiaAvatar = memo(({ uri, size }: SkiaAvatarProps) => {
  const image = useImage(uri);

  const defaultPlaceholder = require('../assets/images/Def-Ava.png');

  const avatarStyle: StyleProp<ImageStyle> = useMemo(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }), [size]);

  if (!image) {
    return (
      <ExpoImage
        source={uri || defaultPlaceholder}
        placeholder={defaultPlaceholder}
        style={avatarStyle}
        contentFit="cover"
        transition={300}
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
});
