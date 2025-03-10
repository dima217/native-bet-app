import { Modal, StyleSheet, View } from 'react-native';
import { ThemedText } from '../components/ui/ThemedText';
import { ThemedView } from '../components/ui/ThemedView';
import CustomButton from '../components/ui/CustomButton';
import CustomInput from '../components/ui/CustomInput';
import { useState } from 'react';
import { Match } from '../types/types';
import { useUserBets } from '../hooks/useUserBets';
import { useForm } from 'react-hook-form';

type FormData = {
  amount: string;
};

export const BetModal = ({ visible, onClose, match }: { visible: boolean; onClose: () => void; match: Match }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [selectedOutcome, setSelectedOutcome] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [selectionError, setSelectionError] = useState<string>();
  const { placeBet } = useUserBets();

  const onSubmit = async (data: { amount: string }) => {
    if (!selectedOutcome) {
      setSelectionError('Please select a team');
      return;
    }
    
    try {
      setLoading(true);
      await placeBet(
        match.id,
        parseInt(data.amount),
        selectedOutcome,
      );
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
            {[match.teamA, match.teamB].map((team) => (
              <CustomButton
                key={team}
                title={team}
                variant={selectedOutcome === team ? 'primary' : 'outline'}
                onPress={() => {
                  setSelectedOutcome(team);
                  setSelectionError(undefined);
                }}
                style={styles.outcomeButton}
              />
            ))}
          </View>

          {selectionError && (
            <ThemedText style={styles.errorText}>{selectionError}</ThemedText>
          )}

          <CustomInput
            control={control}
            name="amount"
            label="Bet sum"
            placeholder="Enter sum"
            keyboardType="numeric"
            rules={{ 
              required: 'Amount is required', 
              min: { 
                value: 1, 
                message: 'Min bet is 1' 
              }, 
              max: { 
                value: 10000, 
                message: 'Max bet is 10000' 
              } 
            }}
            error={errors.amount?.message} 
          />

          <View style={styles.footer}>
            <CustomButton title="Cancel" variant="secondary" onPress={onClose} />
            <CustomButton 
              title="Confirm" 
              onPress={handleSubmit(onSubmit)} 
              loading={loading} 
            />
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
  }
});