import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import LeagueOfLegendsIcon from '../assets/images/Group.svg';
import CounterStrikeIcon from '../assets/images/CS logo.svg';
import ValorantIcon from '../assets/images/valorant-seeklogo.com 1.svg';
import { SvgProps } from 'react-native-svg';
import { SportType } from '@/types/types';

type GameItem = {
  id: SportType;
  name: string;
  Icon: React.FC<SvgProps>;
};

const games: GameItem[] = [
  { id: SportType.LOL, name: 'League of Legends', Icon: LeagueOfLegendsIcon },
  { id: SportType.CSGO, name: 'Counter-Strike', Icon: CounterStrikeIcon },
  { id: SportType.DOTA2, name: 'Valorant', Icon: ValorantIcon },
];

export default function GamesScroll({
  selectedGame,
  onSelect,
}: {
  selectedGame: SportType;
  onSelect: (id: SportType) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {games.map((game) => (
        <TouchableOpacity
          key={game.id}
          style={[
            styles.item,
            selectedGame === game.id && styles.selectedTitle
          ]}
          onPress={() => onSelect(game.id)}
        >
          <game.Icon width={40} height={40} />
          <ThemedText
            style={[
              styles.title
            ]}
          >
            {game.name}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
    height: 60,
    paddingHorizontal: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
    gap: 5,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  title: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  selectedTitle: {
    borderColor: 'white',
  },
});
