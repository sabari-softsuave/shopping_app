import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../Components/Header';

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.settingItem}>Profile</Text>
          <Text style={styles.settingItem}>Notifications</Text>
          <Text style={styles.settingItem}>Privacy</Text>
        </View>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>General</Text>
          <Text style={styles.settingItem}>About</Text>
          <Text style={styles.settingItem}>Help & Support</Text>
          <Text style={styles.settingItem}>Logout</Text>
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
