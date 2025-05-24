import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Swords from '../../assets/images/Icon.svg';
import { SkiaAvatar } from '../../components/SkiaAvatar';
import { Colors } from '../../constants/Colors';

type Props = {
  team: string;
  image?: string;
  index: number;
  selected?: boolean;
  selectable?: boolean;
  onPress?: () => void;
};

export default function TeamCard({ team, image, index = 1, selected, selectable, onPress }: Props) {
  const cardBorder = Colors.colors.border;
  const selectedColor = Colors.colors.tint;

  const content = (
    <View
      style={[
        styles.teamContainer,
        { borderColor: selected ? selectedColor : cardBorder },
        { flexDirection: index === 1 ? 'row' : 'row-reverse' },
        selected && styles.selected,
      ]}
    >
      <ThemedText style={styles.teamName} type='teamCard'>{team}</ThemedText>
        {image ? (
       <View style={styles.avatarWrapper}>
      <SkiaAvatar uri={image} size={28} />
       </View>
       ) : (
      <Swords height={24} width={24} />
     )}

    </View>
  );

  if (selectable) {
    return (
      <Pressable style={styles.container} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  avatarWrapper: {
    backgroundColor: '#484848', 
    padding: 6,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  teamContainer: {
    height: 65,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    justifyContent: 'flex-end',
  },
  selected: {
    borderWidth: 2,
  },
  teamName: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
