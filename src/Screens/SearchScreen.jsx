import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Header from '../Components/Header';
import InputField from '../Components/InputField';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      navigation.navigate('AllProducts', { query: searchText });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
      <Header />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={{ flex: 1 }}>
            <InputField
              placeholder="Search products or categories..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#F83758" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Type to Search</Text>
        <Text style={styles.emptyText}>Find your favorite products across categories like Fashion, Beauty, and more.</Text>

        {/* Potentially add Recent Searches or Categories list here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align smoothly with input container
    gap: 10,
  },
  searchButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2, // Minor alignment adjustment
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    lineHeight: 22,
  },
});
