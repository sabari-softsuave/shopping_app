import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import InputField from '../Components/InputField';

export default function SearchScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <Header />
      <View style={styles.container}>
        <InputField placeholder="Search products..." />
        <Text style={styles.title}>Search Products</Text>
        <Text style={styles.emptyText}>Start searching for products</Text>
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
    marginTop: 20,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
