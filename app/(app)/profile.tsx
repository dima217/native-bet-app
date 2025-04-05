import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/CustomButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import NavigationTabs from '@/components/NavigationTabs';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'error');

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <ThemedText type="title" style={[styles.title, { color: textColor }]}>
          Profile Information
        </ThemedText>

        <View style={styles.infoContainer}>
          <ThemedText style={[styles.label, { color: textColor }]}>Name:</ThemedText>
          <ThemedText style={styles.info}>{user?.username}</ThemedText>

          <ThemedText style={[styles.label, { color: textColor }]}>Email:</ThemedText>
          <ThemedText style={styles.info}>{user?.email}</ThemedText>

          <ThemedText style={[styles.label, { color: textColor }]}>Balance:</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.balance}>
          {user?.balance}
          </ThemedText>
        </View>

        <CustomButton
          title="Logout"
          onPress={logout}
        />
      </View>

      <NavigationTabs currentScreen="profile" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: 60, // Отступ для навигационной панели
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    gap: 15,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
    color: '#666',
  },
  balance: {
    fontSize: 24,
    color: '#4CAF50',
    marginVertical: 10,
  },
  logoutButton: {
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});