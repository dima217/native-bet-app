import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import LeagueOfLegendsIcon from '../assets/images/Group.svg';
import CounterStrikeIcon from '../assets/images/CS logo.svg';
import ValorantIcon from '../assets/images/valorant-seeklogo.com 1.svg';
import { SvgProps } from 'react-native-svg';

type GameItem = {
  id: string;
  name: string;
  Icon: React.FC<SvgProps>;
};

const games: GameItem[] = [
  { id: '1', name: 'League of Legends', Icon: LeagueOfLegendsIcon },
  { id: '2', name: 'Counter-Strike', Icon: CounterStrikeIcon },
  { id: '3', name: 'Valorant', Icon: ValorantIcon },
];

export default function GamesScroll() {
  const [selectedGame, setSelectedGame] = useState<string>('1');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {games.map((game) => (
        <TouchableOpacity
          key={game.id}
          style={styles.item}
          onPress={() => setSelectedGame(game.id)}
        >
          <game.Icon width={40} height={40} />
          <ThemedText 
            style={[
              styles.title,
              selectedGame === game.id && styles.selectedTitle
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
    marginBottom: 20,
    height: 60,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginRight: 18,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  selectedTitle: {
    color: 'white',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
  },
});