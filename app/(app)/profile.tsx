import { StatusBar, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import NavigationTabs from '@/components/NavigationTabs';
import BaseHeader from '@/components/BaseHeader';
import CustomAvatar from '@/components/ui/CustomAvatar';
import { useRouter } from 'expo-router';
import { Routes } from '@/types/navigationTypes';
import { API_URL } from '@/config';
import Settings from '../../assets/images/settings 1.svg'
import Edit from '../../assets/images/edit (2) 2.svg'
import Link from '../../assets/images/link (1) 1.svg'

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const backgroundColor = useThemeColor({}, 'background');
  const buttonColor = useThemeColor({}, 'error');
  const router = useRouter();
  const avatarUri = user?.avatarUrl ? `${API_URL}${user.avatarUrl}` : null;
  console.log('Avatar full URL:', avatarUri);
  
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="#000000" />

      <BaseHeader label="My account" />

      <View style={styles.avatar}>
        <CustomAvatar size={64} image={`${API_URL}${user?.avatarUrl}`} />
      </View>

      <ThemedView style={[styles.container, { backgroundColor }]}>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.info}>{user?.username}</ThemedText>
          <ThemedText style={styles.info}>{user?.email}</ThemedText>
        </View>

        <CustomButton
          title="Settings"
          onPress={() => router.push('/(app)/(profile)/settings')}
          icon={<Settings width={24} height={24}/>}
        />
        <CustomButton
          title="Edit Profile"
          onPress={() => router.push('/(app)/(profile)/editProfile')}
          icon={<Edit width={24} height={24}/>}
        />
        <CustomButton
          title="Link other accounts"
          onPress={() => router.push('/(app)/(profile)/linkAccounts')}
          icon={<Link width={24} height={24}/>}
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
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: 30,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
    color: '#666',
  }
});
