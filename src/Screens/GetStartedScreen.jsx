import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const GetStartedScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Image source={require('../../assets/InitialPages/GetStartedImage.jpg')} style={styles.backgroundImage}/>
      <LinearGradient 
        colors={['transparent', 'rgba(0, 0, 0, 0.63)']} 
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.textBox}>      
        <Text style={styles.mainText}>You want Authentic, here you go!</Text>
        <Text style={styles.subText}>Find it here, buy it now!</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.replace("MainApp")}}>
            <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default GetStartedScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backgroundImage:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradient:{
        position: 'absolute',
        width: '100%',
        height: 600,
        bottom: 0,
    },
    textBox:{
        justifyContent: 'flex-end',
        alighnItems: 'flex-end',
        position: 'absolute',
        width: '100%',
        marginBottom: 50,
    },
    timeText:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 15,
        color: '#FFFFFF',
    },
    mainText:{
        position: 'absolute',
        width: 315,
        height: 130,
        left: 37,
        top: 575,
        fontFamily: 'Montserrat',
        fontWeight: 'semi-bold',
        fontSize: 45,
        lineHeight: 41,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    subText:{
        position: 'absolute',
        width: 315,
        left: 37,
        top: 725,
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 22,
        textAlign: 'center',
        color: '#F2F2F2',
    },
    button:{
        position: 'absolute',
        width: 279,
        height: 55,
        left: 55,
        top: 825,
        backgroundColor: '#F83758',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 23,
        color: '#FFFFFF',
    },
})