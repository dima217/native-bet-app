import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import CustomAvatar from './ui/CustomAvatar';
import Flag from '../assets/images/united-states 1.svg';

export default function LeaderboardItem({
  rank,
  avatar,
  username,
  value,
  label,
}: {
  rank: number;
  avatar?: string;
  username: string;
  value: number;
  label: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{rank}</Text>

      <View style={styles.flag}>
        <Flag width={16} height={11} />
      </View>

      <CustomAvatar size={32}/>

      <Text style={styles.username}>{username}</Text>

      <View style={styles.valueSection}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  flag: {
    marginRight: 10,
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
  valueSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 12,
  },
  value: {
    marginRight: 7,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  heart: {
    padding: 4,
  },
});
