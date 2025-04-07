import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SkiaAvatar } from '../SkiaAvatar';
import Camera from '../../assets/images/Camera.svg';
import Plus from '../../assets/images/Plus.svg';

type Props = {
  onPress: () => void;
  image?: string | null;
};

export const ImagePickerButton = ({ onPress, image }: Props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <View style={styles.circle}>
          {image ? (
            <SkiaAvatar uri={image} size={136} />
          ) : (
            <Camera width={50} height={40} />
          )}
        </View>

        <View style={styles.plusCircle}>
          <Plus width={23} height={23} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  wrapper1: {
    height: 136,
    width: 136,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  circle: {
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 1.5,
    borderColor: '#0166FE',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  plusCircle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0166FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0166FE',
  },
});
