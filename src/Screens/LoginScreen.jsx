import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome{"\n"}Back !</Text>
    <View>
    <View style={{gap:10, alignItems:'center', marginBottom:20}}>
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#888" style={styles.icon} />
        <TextInput 
          placeholder="Username or Email" 
          style={styles.input} 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {!isEmailValid && email.length > 0 && (
        <Text style={styles.errorText}>Please enter a valid email address</Text>
      )}

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#A8A8A9" />
        </TouchableOpacity>
      </View>
      {!isPasswordValid && password.length > 0 && (
        <Text style={styles.errorText}>Password must be at least 6 characters</Text>
      )}
    </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.button}
        disabled={!isFormValid}
        onPress={()=>{navigation.navigate("GetStarted")}}
      >
        <Text style={styles.buttonText} >Login</Text>
      </TouchableOpacity>

      <View style={{alignItems: 'center', marginTop:110}}> 
          <Text>- OR Continue with -</Text>
          <View style={styles.SocialMediaContainer}>  
          {/* Social Media Buttons can be added here */}
          <Image source={require('../../assets/SocialMediaButtons/Google.png')} style={{width:50, height:50, margin:10}} />
          <Image source={require('../../assets/SocialMediaButtons/Apple.png')} style={{width:50, height:50, margin:10}} />    
          <Image source={require('../../assets/SocialMediaButtons/Facebook.png')} style={{width:50, height:50, margin:10}} />
          </View>
         <Text style={styles.footer}>
        Create An Account{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
        >
          Sign Up
        </Text>
      </Text>
      </View>
      
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 60,
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
    backgroundColor:'#F3F3F3',
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
  },
  icon: {
    padding: 5,
  },
  forgot: {
    color:'#F83758',
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: '-10'
  },
  button: {
    backgroundColor: '#F83758',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 15,
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
    marginTop: '-20' ,
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
  link: {
    fontWeight: '600',
  },
  icon: {
    marginRight: 10,
  },
  SocialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
