import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedView } from './ui/ThemedView';

const row1 = ['1', '2', '3', '4', '5', '6'];
const row2 = ['7', '8', '9', '0', '00'];

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
    setAmount((prev) => {
      let value = prev;

      if (key === 'del') {
        return value.slice(0, -1);
      }

      if (key === '+') {
        return String(Math.min(Number(value || '0') + 1, 9999));
      }

      if (key === '-') {
        return String(Math.max(Number(value || '0') - 1, 0));
      }

      if (value === '0') value = '';

      if (value.length >= 4) return value;

      return value + key;
    });
  };

  const parsedAmount = Number(amount || '0');

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputRow}>
      <View style={styles.amountContainer}>
          <TouchableOpacity onPress={() => handleKeyPress('-')} style={styles.sideControl}>
            <Text style={styles.controlText}>−</Text>
          </TouchableOpacity>

          <View style={styles.amountBox}>
            <Text style={styles.amountText}>{parsedAmount}</Text>
          </View>

          <TouchableOpacity onPress={() => handleKeyPress('+')} style={styles.sideControl}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => handleKeyPress('del')} style={styles.outlineBtn}>
          <Text style={styles.outlineText}>⌫</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancel} style={styles.outlineBtn}>
          <Text style={styles.outlineText}>Cancel</Text>
        </TouchableOpacity>
      </View>

     <View style = {styles.keyContainer}>
     <View style={styles.keyboard}>
      <View style={styles.keyRow}>
        {row1.map((num) => (
          <TouchableOpacity key={num} style={styles.key} onPress={() => handleKeyPress(num)}>
             <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
          ))}
      </View>
      <View style={styles.keyRow}>
      {row2.map((num) => {
        const isDoubleWidth = num === '00';
        return (
          <TouchableOpacity
            key={num}
            style={[
            styles.key,
            isDoubleWidth && styles.doubleKey
          ]}
          onPress={() => handleKeyPress(num)}
        >
        <Text style={styles.keyText}>{num}</Text>
      </TouchableOpacity>
    );
  })}
</View>
    </View>
      <TouchableOpacity
        onPress={() => onConfirm(parsedAmount)}
        style={styles.voteBtn}
      >
        <Text style={styles.voteText}>Vote</Text>
        <Text style={styles.voteTextSmall}>win 2gg + bonus</Text>
      </TouchableOpacity>
     </View>
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
    keyContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 10,
    },
    outlineBtn: {
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#666666',
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
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#fff',
      alignItems: 'center',
      height: 35,
      minWidth: 120,
      flex: 1,
    },
    sideControl: {
      width: 30,
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
    keyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    key: {
      width: '13%',
      height: 32,
      backgroundColor: 'transparent',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#666666',
      marginRight: 4,
    },
    doubleKey: {
      width: '30%' 
    },
    keyboard: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    keyText: {
      color: '#fff',
      fontSize: 20,
    },
    voteBtn: {
      backgroundColor: '#FFB800',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
      width: '25%'
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
  
