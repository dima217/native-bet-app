import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type Props = {
  time: number;
  showHours?: boolean;
};

export default function Timer({ time, showHours = false }: Props) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');

  if (showHours) {
    return (
      <View style={styles.container}>
        {[{ value: h, label: 'Hours' }, { value: m, label: 'Minutes' }, { value: s, label: 'Seconds' }].map(
          ({ value, label }, index) => (
            <View key={index} style={styles.unitBlock}>
              <View style={styles.timeBox}>
                <Text style={styles.timeText}>{value}</Text>
              </View>
              <Text style={styles.label}>{label}</Text>
            </View>
          )
        )}
      </View>
    );
  }

  return <Text style={styles.simpleTimer}>{`${m}:${s}`}</Text>;
}


const styles = StyleSheet.create({
  simpleTimer: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  unitBlock: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    height: 75
  },
  timeBox: {
    borderColor: '#484848',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 6,
    fontSize: 13,
    color: 'white',
  },
});
