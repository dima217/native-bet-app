import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid, Platform, Alert } from 'react-native';
import { Match } from '@/types/types';
import { ThemedView } from '../ui/ThemedView';
import { ThemedText } from '../ui/ThemedText';
import MatchLine from '../ui/MatchLine';
import CustomButton from '../ui/Buttons/CustomButton';
import Clock from '../../assets/images/clock 1.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import BetKeyboard from '../../components/BetKeyBoard';
import { useUserBets } from '@/hooks/useUserBets';
import { router } from 'expo-router'; 
import Toast from 'react-native-toast-message';

export default function MatchDetailsCard({
  match,
  onBack,
}: {
  match: Match;
  onBack: () => void;
}) {
  const cardColor = useThemeColor({}, 'cardBackground');
  const { placeBet } = useUserBets();

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<string | undefined>();
  const [selectionError, setSelectionError] = useState<string | undefined>();

  const handleTeamSelect = (team: string) => {
    setSelectedOutcome(team);
    setSelectionError(undefined);
    setShowKeyboard(true);
  };

  const handleDrawPress = () => {
    setSelectedOutcome('Draw');
    setSelectionError(undefined);
    setShowKeyboard(true);
  };

  const handleConfirmBet = async (amount: number) => {
    if (!selectedOutcome) {
      setSelectionError('Please select a team');
      return;
    }

    try {
      await placeBet(match.id, amount, selectedOutcome);

      setShowKeyboard(false);
      setSelectedOutcome(undefined);

      if (Platform.OS === 'android') {
        Toast.show({
          type: 'success',           
          text1: 'Bet Placed!',
          text2: 'Your bet has been placed successfully!',
          visibilityTime: 3000,     
          position: 'top',           
        });
      } else {
        Alert.alert('Success', 'Bet has been placed successfully!!');
      }

      router.push('/bets'); 

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to place bet!',
      });
    }
  };

  return (
    <>
      <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{match.sportType.toUpperCase()}</ThemedText>
        </View>

        <MatchLine
          teamA={match.teamA}
          teamB={match.teamB}
          votedTeam={selectedOutcome}
          selectable
          onSelectTeam={handleTeamSelect}
        />

        {showKeyboard ? (
          <BetKeyboard
            style={styles.keyBoard}
            onCancel={() => {
              setShowKeyboard(false);
              setSelectedOutcome(undefined);
            }}
            onConfirm={handleConfirmBet}
          />
        ) : (
          <CustomButton
            title="Draw"
            onPress={handleDrawPress}
            style={styles.drawButton}
          />
        )}

        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ThemedText>← Back</ThemedText>
        </TouchableOpacity>

        <View style={styles.time}>
          <Clock width={12} height={12} />
          <ThemedText>{'2h 5min'}</ThemedText>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 8,
    paddingBottom: 0,
    marginVertical: 12,
    marginHorizontal: 8,
    borderWidth: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  keyBoard: {
    marginTop: 30,
  },
  drawButton: {
    borderWidth: 1,
    borderColor: '#666C7C',
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 25,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 88,
    height: 25,
    borderRadius: 4,
    alignSelf: 'center',
    gap: 4,
  },
  backButton: {
    marginBottom: 5,
    alignSelf: 'center',
  },
});
