import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/ui/Buttons/CustomButton';
import ScreenWrapper from '@/components/BaseWrappers/ScreenWrapper';
import ConstructionIcon from '@/assets/images/IconUnder.svg';

export default function UnderConstructionScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ThemedView style={styles.container}>
        <ConstructionIcon width={100} height={100} style={styles.icon} />

        <ThemedText type="title" style={styles.title}>
          Page under construction
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          We're working on it. Check back soon!
        </ThemedText>

        <CustomButton
          title="Go back"
          onPress={() => router.back()}
          style={styles.button}
        />
      </ThemedView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    width: '70%',
  },
});
