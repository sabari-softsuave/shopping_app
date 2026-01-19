import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartProductCard({ item, handleDeleteCart, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={item.images && item.images.length > 0 ? item.images[0] : item.image}
          style={styles.image}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCart(item)}>
          <Ionicons name="trash" size={18} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color="#FFB800" />
        <Text style={styles.rating}>{item.rating}</Text>
        <Text style={styles.reviews}>({item.reviews})</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>Rs.{item.price}</Text>
        <Text style={styles.originalPrice}>{item.originalPrice}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    margin: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E7E7EB',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F83758',
    borderRadius: 20,
    padding: 6,
  },
  quantityBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: '#999',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: '#000',
  },
  reviews: {
    fontSize: 10,
    color: '#999',
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F83758',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
});
