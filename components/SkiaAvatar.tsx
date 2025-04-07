// components/SkiaAvatar.tsx
import React from 'react';
import { Canvas, Image as SkiaImage, useImage } from '@shopify/react-native-skia';

type SkiaAvatarProps = {
  uri: string;
  size: number;
};

export const SkiaAvatar = ({ uri, size }: SkiaAvatarProps) => {
  const image = useImage(uri);
  if (!image) return null;

  const srcWidth = image.width();
  const srcHeight = image.height();

  const radius = size / 2;
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
