import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function CheckoutScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  // Bank details (optional for address display, but good to have state)
  const [bankAccount, setBankAccount] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [ifsc, setIfsc] = useState('');

  const handleSave = () => {
    const addressData = {
      address,
      city,
      state,
      pincode,
      country,
      // You can add contact info here if you have a field for it
    };
    navigation.navigate('CheckoutSummary', { addressData });
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.spacer} />

        {/* Profile */}
        <View style={styles.profile}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/5.jpg' }}
            style={styles.profileImage}
          />
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
        </View>

        <View style={styles.spacer} />
        {/* Personal Details */}
        <Section title="Personal Details">
          <Text>Email Adderss</Text>
          <TextInput style={styles.inputBox} placeholder="abhiraj@gmail.com" value={email} onChangeText={setEmail} />
          <Text>Password</Text>
          <TextInput style={styles.inputBox} placeholder="password" secureTextEntry value={password} onChangeText={setPassword} />
          <Text style={styles.link}>Change Password</Text>
        </Section>

        {/* Business Address */}
        <Section title="Business Address Details">
          <Text>Pincode</Text>
          <TextInput style={styles.inputBox} placeholder="450116" value={pincode} onChangeText={setPincode} keyboardType="numeric" />
          <Text>Address</Text>
          <TextInput style={styles.inputBox} placeholder="216 St Paul’s Rd," value={address} onChangeText={setAddress} />
          <Text>City</Text>
          <TextInput style={styles.inputBox} placeholder="London" value={city} onChangeText={setCity} />
          <Text>State</Text>
          <TextInput style={styles.inputBox} placeholder="N12LL" value={state} onChangeText={setState} />
          <Text>Country</Text>
          <TextInput style={styles.inputBox} placeholder="United Kingdom" value={country} onChangeText={setCountry} />
        </Section>

        {/* Bank Details */}
        <Section title="Bank Account Details">
          <Text>Bank Account Number</Text>
          <TextInput style={styles.inputBox} placeholder="203456XXXXXX" value={bankAccount} onChangeText={setBankAccount} keyboardType="numeric" />
          <Text>Account Holder’s Name</Text>
          <TextInput style={styles.inputBox} placeholder="Abhiraj Sisodiya" value={accountHolder} onChangeText={setAccountHolder} />
          <Text>IFSC Code</Text>
          <TextInput style={styles.inputBox} placeholder="SBIN00428" value={ifsc} onChangeText={setIfsc} />
        </Section>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

/* Reusable Components */

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Input = ({ label, value }) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} value={value} editable={false} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
  },
  link: {
    color: '#ff3b5c',
    textAlign: 'right',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff3b5c',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputBox: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C8C8C8',
    padding: 10,
    marginBottom: 10,
  },
  spacer: {
    height: 1,
    marginHorizontal: -17,
    backgroundColor: '#E0E0E0',
    width: '110%',
    marginVertical: 15,
  },
});
