import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Image } from 'react-native';
import { SvgXml } from 'react-native-svg'

type FormData = {
  username: string
  email: string
  password: string
  balance: number
}

const xml = `
<svg width="223" height="96" viewBox="0 0 223 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_1873)">
<path d="M86.6154 66.9309L80.5858 60.9014L73.9014 67.5857L79.931 73.6154C81.7769 75.4612 84.7696 75.4612 86.6154 73.6154C88.4612 71.7695 88.4612 68.7768 86.6154 66.9309Z" fill="white"/>
<path d="M62.9596 68.2674C63.2894 68.2674 63.6194 68.1415 63.871 67.8898C64.3745 67.3864 64.3745 66.5702 63.871 66.0668L62.3565 64.5522L87.5268 43.9733C87.8262 43.7285 87.9999 43.3621 87.9999 42.9753V32.2891C87.9999 31.5772 87.4228 31 86.7108 31H76.0244C75.6376 31 75.2713 31.1737 75.0264 31.4731L54.4475 56.6433L52.933 55.1288C52.4296 54.6254 51.6134 54.6253 51.11 55.1288C50.6066 55.6322 50.6066 56.4483 51.11 56.9517L62.048 67.8898C62.2998 68.1416 62.6296 68.2674 62.9596 68.2674ZM79.9744 37.2025C80.4777 36.6991 81.2939 36.6991 81.7974 37.2025C82.3008 37.706 82.3008 38.5221 81.7974 39.0255L59.3135 61.5094L57.4905 59.6864L79.9744 37.2025Z" fill="white"/>
<path d="M52.0688 73.6154L58.0983 67.5858L51.414 60.9014L45.3844 66.931C43.5385 68.7769 43.5385 71.7696 45.3844 73.6154C47.2302 75.4612 50.2229 75.4612 52.0688 73.6154Z" fill="white"/>
<path d="M44.4731 43.9734L54.6642 52.3055L58.6308 47.4538L50.2025 39.0255C49.6991 38.5222 49.6991 37.706 50.2025 37.2025C50.706 36.6991 51.5221 36.6991 52.0255 37.2025L60.2709 45.4479L64.335 40.4771L56.9734 31.4731C56.7285 31.1737 56.3622 31 55.9754 31H45.2891C44.5772 31 44 31.5772 44 32.2891V42.9755C44 43.3623 44.1737 43.7285 44.4731 43.9734Z" fill="white"/>
<path d="M79.0665 55.1285L77.552 56.6431L76.9714 55.933L73.5518 58.7288L74.509 59.6861L72.686 61.509L71.5458 60.3688L68.0362 63.2382L69.6431 64.5519L68.1285 66.0665C67.6252 66.5698 67.6251 67.386 68.1285 67.8895C68.6319 68.3929 69.4481 68.3929 69.9515 67.8895L80.8895 56.9514C81.1413 56.6997 81.2671 56.3699 81.2671 56.04C81.2671 55.7102 81.1413 55.3802 80.8895 55.1285C80.3861 54.6251 79.57 54.6251 79.0665 55.1285Z" fill="white"/>
</g>
<path d="M37.12 51.504C37.12 52.8267 37.0347 54.0213 36.864 55.088H9.92C10.1333 57.904 11.1787 60.1653 13.056 61.872C14.9333 63.5787 17.2373 64.432 19.968 64.432C23.8933 64.432 26.6667 62.7893 28.288 59.504H36.16C35.0933 62.7467 33.152 65.4133 30.336 67.504C27.5627 69.552 24.1067 70.576 19.968 70.576C16.5973 70.576 13.568 69.8293 10.88 68.336C8.23467 66.8 6.144 64.6667 4.608 61.936C3.11467 59.1627 2.368 55.9627 2.368 52.336C2.368 48.7093 3.09333 45.5307 4.544 42.8C6.03733 40.0267 8.10667 37.8933 10.752 36.4C13.44 34.9067 16.512 34.16 19.968 34.16C23.296 34.16 26.2613 34.8853 28.864 36.336C31.4667 37.7867 33.4933 39.8347 34.944 42.48C36.3947 45.0827 37.12 48.0907 37.12 51.504ZM29.504 49.2C29.4613 46.512 28.5013 44.3573 26.624 42.736C24.7467 41.1147 22.4213 40.304 19.648 40.304C17.1307 40.304 14.976 41.1147 13.184 42.736C11.392 44.3147 10.3253 46.4693 9.984 49.2H29.504Z" fill="white"/>
<path d="M104.096 39.92C105.333 38.2987 107.019 36.9333 109.152 35.824C111.285 34.7147 113.696 34.16 116.384 34.16C119.456 34.16 122.251 34.928 124.768 36.464C127.328 37.9573 129.333 40.0693 130.784 42.8C132.235 45.5307 132.96 48.6667 132.96 52.208C132.96 55.7493 132.235 58.928 130.784 61.744C129.333 64.5173 127.328 66.6933 124.768 68.272C122.251 69.808 119.456 70.576 116.384 70.576C113.696 70.576 111.307 70.0427 109.216 68.976C107.125 67.8667 105.419 66.5013 104.096 64.88V86.768H96.8V34.736H104.096V39.92ZM125.536 52.208C125.536 49.776 125.024 47.6853 124 45.936C123.019 44.144 121.696 42.8 120.032 41.904C118.411 40.9653 116.661 40.496 114.784 40.496C112.949 40.496 111.2 40.9653 109.536 41.904C107.915 42.8427 106.592 44.208 105.568 46C104.587 47.792 104.096 49.904 104.096 52.336C104.096 54.768 104.587 56.9013 105.568 58.736C106.592 60.528 107.915 61.8933 109.536 62.832C111.2 63.7707 112.949 64.24 114.784 64.24C116.661 64.24 118.411 63.7707 120.032 62.832C121.696 61.8507 123.019 60.4427 124 58.608C125.024 56.7733 125.536 54.64 125.536 52.208ZM172.495 51.504C172.495 52.8267 172.41 54.0213 172.239 55.088H145.295C145.508 57.904 146.554 60.1653 148.431 61.872C150.308 63.5787 152.612 64.432 155.343 64.432C159.268 64.432 162.042 62.7893 163.663 59.504H171.535C170.468 62.7467 168.527 65.4133 165.711 67.504C162.938 69.552 159.482 70.576 155.343 70.576C151.972 70.576 148.943 69.8293 146.255 68.336C143.61 66.8 141.519 64.6667 139.983 61.936C138.49 59.1627 137.743 55.9627 137.743 52.336C137.743 48.7093 138.468 45.5307 139.919 42.8C141.412 40.0267 143.482 37.8933 146.127 36.4C148.815 34.9067 151.887 34.16 155.343 34.16C158.671 34.16 161.636 34.8853 164.239 36.336C166.842 37.7867 168.868 39.8347 170.319 42.48C171.77 45.0827 172.495 48.0907 172.495 51.504ZM164.879 49.2C164.836 46.512 163.876 44.3573 161.999 42.736C160.122 41.1147 157.796 40.304 155.023 40.304C152.506 40.304 150.351 41.1147 148.559 42.736C146.767 44.3147 145.7 46.4693 145.359 49.2H164.879ZM186.971 39.856C188.038 38.064 189.446 36.6773 191.195 35.696C192.987 34.672 195.099 34.16 197.531 34.16V41.712H195.675C192.816 41.712 190.64 42.4373 189.147 43.888C187.696 45.3387 186.971 47.856 186.971 51.44V70H179.675V34.736H186.971V39.856ZM212.75 40.688V60.208C212.75 61.5307 213.048 62.4907 213.646 63.088C214.286 63.6427 215.352 63.92 216.846 63.92H221.326V70H215.566C212.28 70 209.763 69.232 208.014 67.696C206.264 66.16 205.39 63.664 205.39 60.208V40.688H201.23V34.736H205.39V25.968H212.75V34.736H221.326V40.688H212.75Z" fill="white"/>
<defs>
<clipPath id="clip0_1_1873">
<rect width="44" height="44" fill="white" transform="translate(44 31)"/>
</clipPath>
</defs>
</svg>
`;

// RegisterScreen.tsx
export default function RegisterScreen() {
  const router = useRouter();
  const { register: signUp, isLoading } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState('');

  const getErrorMessage = (error: FieldError | undefined): string | undefined => {
    return error?.message;
  };

  const onSubmit = async (data: FormData) => {
    try {
      await signUp({
        username: data.username,
        email: data.email,
        password: data.password,
        balance: Number(data.balance)
      });
      await new Promise(resolve => setTimeout(resolve, 300));
      router.replace('/(app)/matches');
    } catch (err) {
      let errorMessage = 'Registration failed';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
    }
  };

  return (
    <LinearGradient
      colors={Colors.dark.gradientBackground}
      start={{ x: 1, y: 0.1 }}
      end={{ x: 0.9, y: 0.9 }}
      locations={[0.3, 0.8]}
      style={styles.container} 
    >
    
    <ThemedView style={styles.innerContainer}>
    
    <SvgXml xml={xml} width='223' height='96' style={styles.image}/>
     

      {error && <ThemedText style={styles.error}>{error}</ThemedText>}


      <CustomInput
        control={control}
        name="email"
        label="Email"
        placeholder="your@email.com"
        keyboardType="email-address"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid email format'
          }
        }}
        error={getErrorMessage(errors.email)}
      />

      <CustomInput
        control={control}
        name="password"
        label="Password"
        placeholder="••••••••"
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Minimum 6 characters'
          }
        }}
        error={getErrorMessage(errors.password)}
      />

      <CustomButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={styles.button}
      />

      <ThemedText style={styles.social}>
          or use social accounts
      </ThemedText>

    </ThemedView>
    <TouchableOpacity 
        onPress={() => router.replace('/(auth)/login')}
        style={styles.linkContainer}
      >
        <ThemedText style={styles.linkText}>
        By signing in the app you agree with&accept {' '}
          <ThemedText style={styles.link}>Terms and Conditions</ThemedText>
        </ThemedText>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    paddingTop: 0,
  },

  innerContainer: { 
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    padding: 20,
  },

  image: {
    alignSelf: 'center', 
    marginBottom: 20, 
    resizeMode: 'contain',
  },

  title: {
    fontSize: 28,
    marginBottom: 30, 
    textAlign: 'center',
  },
  error: {
    color: '#ff0000',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    marginTop: 25,
  },
  linkContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  linkText: {
    color: '#E5E5E5',
    fontSize: 10,
  },
  link: {
    color: '#E5E5E5',
    fontSize: 10,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  social: {
    alignSelf: 'center',
    marginTop: 10,
  }
} as const;