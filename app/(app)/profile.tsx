import { StatusBar, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import NavigationTabs from '@/components/NavigationTabs';
import BaseHeader from '@/components/BaseHeader';
import CustomAvatar from '@/components/ui/CustomAvatar';
import { useRouter } from 'expo-router';
import { API_URL } from '@/config';
import Settings from '../../assets/images/settings 1.svg';
import Edit from '../../assets/images/edit (2) 2.svg';
import Link from '../../assets/images/link (1) 1.svg';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const backgroundColor = Colors.colors.background;
  const router = useRouter();

  const avatarUri = user?.avatarUrl ? `${API_URL}${user.avatarUrl}` : null;

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />
      <BaseHeader label="My account" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avatar}>
          <CustomAvatar size={90} image={avatarUri} />
        </View>

        <ThemedView style={[styles.container, { backgroundColor }]}>
          <View style={styles.infoContainer}>
            <ThemedText style={styles.infoName} type='sfMedium'>{user?.username}</ThemedText>
            <ThemedText style={styles.info} type='sfMedium'>{user?.email}</ThemedText>
          </View>

          <CustomButton
            title="Settings"
            onPress={() => router.push('/(app)/(profile)/settings')}
            icon={<Settings width={24} height={24} />}
          />
          <CustomButton
            title="Edit Profile"
            onPress={() => router.push('/(app)/(profile)/editProfile')}
            icon={<Edit width={24} height={24} />}
          />
          <CustomButton
            title="Link other accounts"
            onPress={() => router.push('/(app)/(profile)/linkAccounts')}
            icon={<Link width={24} height={24} />}
          />
        </ThemedView>

        <CustomButton
          title="Logout "
          onPress={logout}
          style={styles.button}
        />
      </ScrollView>
      <NavigationTabs currentScreen="profile" />
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 140,
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    width: '90%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0166FE',
  },
  container: {
    width: '90%',
    marginTop: 8,
    flex: 1,
  },
  avatar: {
    marginTop: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 15,
    gap: 5,
  },
  info: {
    fontSize: 16,
    color: '#666',
  },
  infoName: {
    fontSize: 20,
    color: '#fff',
  },
});
