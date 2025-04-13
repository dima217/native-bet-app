import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedView } from './ui/ThemedView';

const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function BetKeyboard({
  onCancel,
  onConfirm,
  style,
}: {
  onCancel: () => void;
  onConfirm: (amount: number) => void;
  style?: ViewStyle;
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
    <View style={
        [styles.container, style]
    }>

      <View style={styles.inputRow}>
        <TouchableOpacity onPress={onCancel} style={styles.outlineBtn}>
          <Text style={styles.outlineText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleKeyPress('del')} style={styles.outlineBtn}>
          <Text style={styles.outlineText}>⌫</Text>
        </TouchableOpacity>

        <View style={styles.amountContainer}>
          <TouchableOpacity onPress={() => handleKeyPress('-')} style={styles.sideControl}>
            <Text style={styles.controlText}>−</Text>
          </TouchableOpacity>

          <View style={styles.amountBox}>
            <Text style={styles.amountText}>{amount || '0'}</Text>
          </View>

          <TouchableOpacity onPress={() => handleKeyPress('+')} style={styles.sideControl}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.voteText}>Vote</Text>
        <Text style={styles.voteTextSmall}>win 2gg + bonus</Text>
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
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 16,
    },
    outlineBtn: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#666C7C',
      borderRadius: 8,
      backgroundColor: 'transparent',
      flex: 2
    },
    outlineText: {
      color: '#fff',
      fontSize: 16,
    },
    amountContainer: {
      flexDirection: 'row',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#fff',
      alignItems: 'center',
      height: 40,
      minWidth: 120,
      flex: 1,
    },
    sideControl: {
      width: 40,
      height: '100%',
      backgroundColor: '#E5E5E5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    controlText: {
      fontSize: 20,
      color: '#000',
    },
    amountBox: {
      flex: 1,
      height: '100%',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    amountText: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold',
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
      marginVertical: 4,
    },
    keyText: {
      color: '#000',
      fontSize: 20,
    },
    voteBtn: {
        width: '90%', 
        marginTop: 30,
        padding: 16,
        backgroundColor: '#FFB800',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        alignSelf: 'center', 
    },
    voteText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
    voteTextSmall: {
      color: '#fff',
      fontWeight: 'semibold',
      textAlign: 'center',
      fontSize: 12,
    }
});
  
