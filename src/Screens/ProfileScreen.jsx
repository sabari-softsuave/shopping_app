import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateUserProfile } from '../redux/slices/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [city, setCity] = useState(user?.city || '');
    const [state, setState] = useState(user?.state || '');
    const [pincode, setPincode] = useState(user?.pincode || '');
    const [country, setCountry] = useState(user?.country || '');

    useEffect(() => {
        // Sync local state when user updates (e.g. initial load)
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setCity(user.city || '');
            setState(user.state || '');
            setPincode(user.pincode || '');
            setCountry(user.country || '');
        }
    }, [user]);

    const handleSave = () => {
        const updatedData = {
            displayName: name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            country
        };

        dispatch(updateUserProfile(updatedData));
        Alert.alert("Success", "Profile updated successfully!", [
            { text: "OK", onPress: () => navigation.navigate('MainApp') }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

                <Text style={styles.label}>Email Address</Text>
                <TextInput style={[styles.input, { backgroundColor: '#f0f0f0' }]} value={email} editable={false} />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Enter phone number" keyboardType="phone-pad" />

                <Text style={styles.sectionHeader}>Address Details</Text>

                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Enter address" />

                <Text style={styles.label}>City</Text>
                <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Enter city" />

                <Text style={styles.label}>State</Text>
                <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="Enter state" />

                <Text style={styles.label}>Pincode</Text>
                <TextInput style={styles.input} value={pincode} onChangeText={setPincode} placeholder="Enter pincode" keyboardType="numeric" />

                <Text style={styles.label}>Country</Text>
                <TextInput style={styles.input} value={country} onChangeText={setCountry} placeholder="Enter country" />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Details</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#000',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#F83758',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
