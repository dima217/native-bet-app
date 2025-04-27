import { View, Text, StyleSheet } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import Trophy from '../../../assets/images/Medal.svg'; 
import ErrorIcon from '../../../assets/images/Vector.svg';

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, { backgroundColor: '#4BB543' }]}>
      <Trophy width={24} height={24} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, { backgroundColor: '#FEA800' }]}>
      <ErrorIcon width={24} height={24} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});
