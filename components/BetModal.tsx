import { Modal, StyleSheet, View } from 'react-native';
import { ThemedText } from '../components/ui/ThemedText';
import { ThemedView } from '../components/ui/ThemedView';
import  CustomButton from '../components/ui/CustomButton';
import  CustomInput from '../components/ui/CustomInput';
import { useState } from 'react';
import { Match } from '../types/types';
import useUserBets from '../hooks/useUserBets';

import { useForm } from 'react-hook-form';

export const BetModal = ({ visible, onClose, match }: { visible: boolean; onClose: () => void; match: Match }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedOutcome, setSelectedOutcome] = useState<'1' | 'X' | '2'>();
  const [loading, setLoading] = useState(false);
  const { placeBet } = useUserBets();

  const onSubmit = async (data: { amount: string }) => {
    if (!selectedOutcome) return;
    try {
      setLoading(true);
      await placeBet(match.id, parseFloat(data.amount));
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ThemedText type="title">New Bet</ThemedText>
          <ThemedText type="subtitle">{match.teamA} vs {match.teamB}</ThemedText>

          <View style={styles.outcomeContainer}>
            {(['1', 'X', '2'] as const).map((outcome) => (
              <CustomButton
                key={outcome}
                title={outcome}
                variant={selectedOutcome === outcome ? 'primary' : 'outline'}
                onPress={() => setSelectedOutcome(outcome)}
                style={styles.outcomeButton}
              />
            ))}
          </View>

          <CustomInput
            control={control}
            name="amount"
            label="Bet sum"
            placeholder="Enter sum"
            keyboardType="numeric"
            rules={{ required: 'Amount is required', min: { value: 1, message: 'Min bet is 1' }, max: { value: 10000, message: 'Max bet is 10000' } }}
            error={errors.amount?.message as string} 
          />

          <View style={styles.footer}>
            <CustomButton title="Cancel" variant="secondary" onPress={onClose} />
            <CustomButton title="Confirm" onPress={handleSubmit(onSubmit)} loading={loading} />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    margin: 20,
    borderRadius: 16,
    padding: 24,
    gap: 20,
  },
  outcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  outcomeButton: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
});