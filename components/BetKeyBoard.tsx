import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

const row1 = ['1', '2', '3', '4', '5', '6'];
const row2 = ['7', '8', '9', '0', '00'];

const MIN_BET = 10;
const MAX_BET = 9999;
const DEFAULT_BET = 100;

export default function BetKeyboard({
  onCancel,
  onConfirm,
  style,
}: {
  onCancel: () => void;
  onConfirm: (amount: number) => void;
  style?: ViewStyle;
}) {
  const [amountStr, setAmountStr] = useState(String(DEFAULT_BET));
  const [isEdited, setIsEdited] = useState(false);

  const parsedAmount = () => {
    const num = parseInt(amountStr, 10);
    if (isNaN(num)) return MIN_BET;
    return Math.max(MIN_BET, Math.min(num, MAX_BET));
  };

  const handleKeyPress = (key: string) => {
    setAmountStr((prev) => {
      let value = prev;

      if (key === 'del') {
        const newVal = value.slice(0, -1);
        setIsEdited(true);
        if (newVal.length === 1) {
          return '';
        }
        return newVal;
      }

      if (key === '+') {
        const next = parsedAmount() + 1;
        setIsEdited(true);
        return String(Math.min(next, MAX_BET));
      }

      if (key === '-') {
        const next = parsedAmount() - 1;
        setIsEdited(true);
        return String(Math.max(next, MIN_BET));
      }
      
      let nextStr = '';

      if (!isEdited || value === '0') {
        nextStr = value + key;
      } else if (value.endsWith('0') && key !== '0' && key !== '00') {
         nextStr = value.slice(0, -1) + key;
      }
      else if (value.length == 0) {
        if (key === '0' || key === '00') {
          nextStr = '10' + key;
        }
        else  {
          nextStr = key + '0';
        }
      }
      else {
        nextStr = value + key;
      }

      const numeric = parseInt(nextStr, 10);
      if (isNaN(numeric) || numeric > MAX_BET) return value;

      setIsEdited(true);
      return nextStr;
    });
  };

  const finalAmount = parsedAmount();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputRow}>
        <View style={styles.amountContainer}>
          <TouchableOpacity onPress={() => handleKeyPress('-')} style={styles.sideControl}>
            <Text style={styles.controlText}>−</Text>
          </TouchableOpacity>

          <View style={styles.amountBox}>
            <Text style={[styles.amountText, amountStr === '' && styles.placeholderText]}>
              {amountStr === '' ? '10' : finalAmount}
            </Text>
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

      <View style={styles.keyContainer}>
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
                  style={[styles.key, isDoubleWidth && styles.doubleKey]}
                  onPress={() => handleKeyPress(num)}
                >
                  <Text style={styles.keyText}>{num}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity onPress={() => onConfirm(finalAmount)} style={styles.voteBtn}>
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  keyContainer: {
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
    flex: 2,
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
    width: '30%',
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
    width: '25%',
  },
  voteText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  voteTextSmall: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  placeholderText: {
    color: '#999', 
    fontWeight: 'normal',
  },  
});
