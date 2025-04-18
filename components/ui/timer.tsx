import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  time: number;
  onTick: React.Dispatch<React.SetStateAction<number>>;
};

export default function Timer({ time, onTick }: Props) {
  useEffect(() => {
    const interval = setInterval(() => {
      onTick(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTick]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return <Text style={styles.timer}>{formatTime(time)}</Text>;
}

const styles = StyleSheet.create({
  timer: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
