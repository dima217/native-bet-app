import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from './ui/ThemedView';

const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function BetKeyboard({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (amount: number) => void;
}) {
  const [amount, setAmount] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === 'del') {
      setAmount((prev) => prev.slice(0, -1));
    } else if (key === '+') {
      setAmount((prev) => String(Number(prev || '0') + 1));
    } else if (key === '-') {
      setAmount((prev) => String(Math.max(Number(prev || '0') - 1, 0)));
    } else {
      setAmount((prev) => (prev + key).slice(0, 4));
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputRow}>
        <TouchableOpacity onPress={() => handleKeyPress('-')} style={styles.sideBtn}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>

        <View style={styles.amountBox}>
          <Text style={styles.amountText}>{amount || '0'}</Text>
        </View>

        <TouchableOpacity onPress={() => handleKeyPress('+')} style={styles.sideBtn}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleKeyPress('del')} style={styles.sideBtn}>
          <Text style={styles.btnText}>⌫</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.keyboard}>
        {keypadNumbers.map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handleKeyPress(num)}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <TouchableOpacity
        onPress={() => onConfirm(Number(amount || '0'))}
        style={styles.voteBtn}
      >
        <Text style={styles.voteText}>Vote{'\n'}win 2gg + bonus</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  amountBox: {
    flex: 1,
    height: 30,
    backgroundColor: 'transparent',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    color: '#fff',
    fontSize: 18,
  },
  sideBtn: {
    padding: 10,
    backgroundColor: '#3a3a3c',
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cancelText: {
    color: '#bbb',
    fontSize: 16,
  },
  keyboard: {
    backgroundColor: 'transparent',
    maxHeight: 160,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2%',
  },
  key: {
    width: '32%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4
  },
  keyText: {
    color: '#fff',
    fontSize: 20,
  },
  voteBtn: {
    width: '100%',
    marginTop: 35,
    padding: 16,
    backgroundColor: '#FFB800',
    borderRadius: 10,
    alignItems: 'center',
  },
  voteText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
