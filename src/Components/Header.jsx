import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>

        <TouchableOpacity>
            <Image
                source={require('../../assets/drawerIcon.png')}
                style={{width:30, height:30}}
            />
      </TouchableOpacity>
      
      <View style={styles.logofixer}>
        <Image source={require('../../assets/StylishIcon.png')} style={styles.logo} />
        <Text style={styles.title}>Stylish</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/5.jpg' }}
        style={styles.avatar}
      />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#4392F9"
  },
  logo:{
    height:25,
    width:30,
  },
  logofixer:{
    flexDirection:'row',
    alignItems:'center',
    gap:6,
  }
});
