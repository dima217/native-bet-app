import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StreakTabs() {
  const [selectedTab, setSelectedTab] = useState<'streak' | 'win'>('streak');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelectedTab('streak')} style={styles.tab}>
        <Text style={styles.tabText}>Highest Streak</Text>
        {selectedTab === 'streak' && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelectedTab('win')} style={styles.tab}>
        <Text style={styles.tabText}>Top Win</Text>
        {selectedTab === 'win' && <View style={styles.underline} />}
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
