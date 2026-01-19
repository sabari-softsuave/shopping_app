import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ProductCard({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          product: item,
        })
      }
      activeOpacity={0.8}
    >
      <Image source={item.images[0]} style={styles.image} />
      <View style={{margin:10,}}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}> Rs.{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 10,
    border:1,
    backgroundColor:'#FFFFFF',
    borderRadius:10,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    padding:-20,
  },
  name: {
    fontWeight: '600',
    marginTop: 6,
  },
  price: {
    color: '#ff3b5c',
  },
});
