import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function Header() {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current; // Start off-screen

  const toggleMenu = () => {
    if (isMenuVisible) {
      // Hide menu
      Animated.timing(slideAnim, {
        toValue: -width * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      // Show menu
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toggleMenu();
      navigation.replace('Login');
    } catch (error) {
      console.error("Logout Error: ", error);
      alert('Failed to log out');
    }
  };

  const navigateToSettings = () => {
    toggleMenu();
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Icon */}
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require('../../assets/drawerIcon.png')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <View style={styles.logofixer}>
        <Image source={require('../../assets/StylishIcon.png')} style={styles.logo} />
        <Text style={styles.title}>Stylish</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/5.jpg' }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Custom Drawer Modal */}
      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
        animationType="none"
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.overlayInput} />
          </TouchableWithoutFeedback>

          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={{ height: 1, backgroundColor: '#D3D3D3', marginTop: -15, marginLeft: -20, marginRight: -20, paddingRight: -35, }} />

            <TouchableOpacity style={styles.menuItem} onPress={navigateToSettings}>
              <Ionicons name="settings-outline" size={24} color="#333" />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#F83758" />
              <Text style={[styles.menuItemText, { color: '#F83758' }]}>Log Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#4392F9",
    marginLeft: 5,
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  logofixer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  overlayInput: {
    flex: 1,
    width: '100%',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: 'white',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 5,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
});
