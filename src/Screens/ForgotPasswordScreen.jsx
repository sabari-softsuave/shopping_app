import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleResetPassword = async () => {
    if (!isEmailValid) return;
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      alert("Password reset email sent!");
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot {"\n"}password?</Text>
      <View style={{ gap: 10, alignItems: 'center', marginBottom: 20 }}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter your email address *"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.info}>
          <Text style={{ color: '#F83758' }}>* </Text> We will send you a message to set or reset{"\n"} your new password
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (!isEmailValid) {
            alert("Please enter a valid email address.");
            return;
          }
          handleResetPassword();
        }}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? "Sending..." : "Submit"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'flex-start',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  inputContainer: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A8A8A9',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 55,
    width: 317,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 7,
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'flex-start',
    marginBottom: 20,
    marginLeft: 10,
    alignSelf: 'left',
  },
  button: {
    backgroundColor: '#F83758',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: 317,
    height: 55,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: -20,
  },
});

export default ForgotPasswordScreen;
