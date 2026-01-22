import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';

export default function SettingsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.settingItem}>Profile</Text>
          </TouchableOpacity>
          <Text style={styles.settingItem}>Notifications</Text>
          <Text style={styles.settingItem}>Privacy</Text>
        </View>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>General</Text>
          <Text style={styles.settingItem}>About</Text>
          <Text style={styles.settingItem}>Help & Support</Text>
          <TouchableOpacity onPress={async () => {
            try {
              const { signOut } = await import('firebase/auth');
              const { auth } = await import('../firebase/firebaseConfig');
              await signOut(auth);
              // Navigation to Login is handled by AppNavigator listener usually, 
              // but we can also manually push if needed.
              // However, since we are in a tab navigator, we likely need to reset stack to Login.
              // For now, let's assume AppNavigator handles it or we manually nav.
              // Actually, simpler to just nav:
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error(error);
            }
          }}>
            <Text style={[styles.settingItem, { color: 'red' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingsSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  settingItem: {
    fontSize: 14,
    paddingVertical: 10,
    color: '#666',
  },
});
