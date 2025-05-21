import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { useState } from "react";

import BaseHeader from "@/components/BaseHeader";
import NavigationTabs from "@/components/NavigationTabs";
import StreakTabs from "@/components/StreakTabs";
import CustomButtonGroup from "@/components/ui/Buttons/CustomButtonGroup";
import LeaderboardItem from "@/components/LeaderBoardItem";
import { ThemedView } from "@/components/ui/ThemedView";
import { View } from "lucide-react-native";

export default function LeadersScreen() {
  const [selectedTab, setSelectedTab] = useState<'streak' | 'win'>('streak');
  const [selectedFilter, setSelectedFilter] = useState('Weekly');

  const mockData = [
    { rank: 1, username: 'ALLMIX', points: 236, streaks: 7 },
    { rank: 2, username: 'VIKINGZ', points: 192, streaks: 13 },
    { rank: 3, username: 'BETKING', points: 174, streaks: 8 },
    { rank: 4, username: 'SKYBET', points: 160, streaks: 25 },
    { rank: 5, username: 'ZULU', points: 148, streaks: 9 },
    { rank: 6, username: 'ALLMIX', points: 236, streaks: 11 },
    { rank: 7, username: 'VIKINGZ', points: 192, streaks: 19 },
    { rank: 8, username: 'BETKING', points: 174, streaks: 8 },
    { rank: 9, username: 'SKYBET', points: 160, streaks: 9 },
    { rank: 10, username: 'ZULU', points: 148, streaks: 17 },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />

      <BaseHeader label="Leaders" />
      
      <ThemedView style={
        styles.container
      }>

      <StreakTabs 
       selected={selectedTab}
       onSelect={(value) => setSelectedTab(value as 'streak' | 'win')}
      />

      <CustomButtonGroup
        options={['Weekly', 'Monthly', 'Lifetime']}
        selected={selectedFilter}
        onSelect={setSelectedFilter}
      />

    <ScrollView style={{ flex: 1, marginTop: 12 }}>
      {mockData.map((item) => (
        <LeaderboardItem
          key={`${item.rank}-${selectedTab}`}
          rank={item.rank}
          username={item.username}
          value={selectedTab === 'streak' ? item.streaks : item.points}
          label={selectedTab === 'streak' ? 'Streaks' : 'Points'}
        />
    ))}
    </ScrollView>

    </ThemedView>

    <NavigationTabs currentScreen={"leaders"} />
    </>
  );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        gap: 5,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 83,
    },
})
