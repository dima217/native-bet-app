import { StatusBar, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/CustomButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import NavigationTabs from '@/components/NavigationTabs';
import BaseHeader from '@/components/BaseHeader';
import CustomAvatar from '@/components/ui/CustomAvatar';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'error');

  return (
  <>
    <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />

    <BaseHeader
        label='My account'
     />

     <View style={styles.avatar}>
      <CustomAvatar
        size={64}
      />
    </View>
    <ThemedView style={[styles.container, { backgroundColor }]}>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.info}>{user?.username}</ThemedText>

          <ThemedText style={styles.info}>{user?.email}</ThemedText>
        </View>

        <CustomButton
          title="Setting"
          onPress={() => router.replace('/(app)/settings')}
        />
        <CustomButton
          title="Edit Profile"
          onPress={logout}
        />

        <CustomButton
          title="Logout"
          onPress={logout}
        />
    </ThemedView>

    <CustomButton
          title="Logout"
          onPress={logout}
          style={styles.button}
      />

    <NavigationTabs currentScreen="profile" />
  </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 125,
    marginHorizontal: 45,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0166FE'
  },

  container: {
    paddingHorizontal: 45,
    marginTop: 8,
    flex: 1,
    marginBottom: 15, 
  },

  avatar: {
    marginTop: 25,
  },

  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
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