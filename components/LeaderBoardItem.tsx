import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import CustomAvatar from './ui/CustomAvatar';

export default function LeaderboardItem({
  rank,
  avatar,
  username,
  points,
}: {
  rank: number;
  avatar?: string;
  username: string;
  points: number;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{rank}</Text>

      <CustomAvatar size={32} />

      <Text style={styles.username}>{username}</Text>

      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{points} gg</Text>
      </View>

      <TouchableOpacity style={styles.heart}>
        <Heart color="#fff" size={18} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#13141A',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rank: {
    color: '#fff',
    fontSize: 16,
    width: 20,
    marginRight: 12,
    textAlign: 'center',
  },
  username: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },
  pointsContainer: {
    marginRight: 12,
  },
  points: {
    color: '#fff',
    fontSize: 15,
  },
  heart: {
    padding: 4,
  },
});
