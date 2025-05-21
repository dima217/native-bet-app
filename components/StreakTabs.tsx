import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StreakTabs({
  selected,
  onSelect
}: {
  selected: string,
  onSelect: (value: string) => void;
}
) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelect('streak')} style={styles.tab}>
        <Text style={styles.tabText}>Highest Streak</Text>
        {selected === 'streak' && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelect('win')} style={styles.tab}>
        <Text style={styles.tabText}>Top Win</Text>
        {selected === 'win' && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 5,
  },
  tab: {
    alignItems: 'center',
    paddingBottom: 8,
    flex: 1,
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  underline: {
    marginTop: 4,
    height: 2,
    backgroundColor: '#2979FF', 
    width: '100%',
  },
});
