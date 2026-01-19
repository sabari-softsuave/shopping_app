import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ALL_PRODUCTS } from '../Data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, deleteFromCart, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isInWishlistState = isInWishlist(product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleCartAction = () => {
    if (isInCart) {
      deleteFromCart(product.id);
    } else {
      addToCart(product);
      Alert.alert("Success", "Product added to cart!");
    }
  };

  const toggleWishlist = () => {
    if (isInWishlistState) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      Alert.alert("Wishlist", "Product added to your wishlist.");
    }
  };

  const similarProducts = ALL_PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20, margin: 10 }}>←</Text>
        </TouchableOpacity>

        <View style={{ position: 'relative' }}>
          <Image
            source={product.images && product.images.length > 0 ? product.images[0] : null}
            style={{ height: 260, width: '100%' }}
          />
          <TouchableOpacity
            onPress={toggleWishlist}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(255,255,255,0.7)',
              padding: 8,
              borderRadius: 20,
            }}
          >
            <Ionicons
              name={isInWishlistState ? "heart" : "heart-outline"}
              size={28}
              color="#ff3b5c"
            />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
          <Text style={{ fontSize: 16, color: '#ff3b5c', marginVertical: 4 }}>
            ₹ {product.price}
          </Text>
          <Text style={{ color: '#555' }}>
            {product.rating} ⭐ ({product.reviews} reviews)
          </Text>
          <Text style={{ marginTop: 10, color: '#666' }}>
            {product.description}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
          <TouchableOpacity
            onPress={handleCartAction}
            style={{
              flex: 1,
              backgroundColor: isInCart ? '#fff' : '#ff3b5c',
              borderWidth: 1,
              borderColor: '#ff3b5c',
              padding: 14,
              marginRight: 8,
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            <Text style={{ color: isInCart ? '#ff3b5c' : '#fff', fontWeight: 'bold' }}>
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (!isInCart) addToCart(product);
              navigation.navigate('ShoppingBag');
            }}
            style={{
              flex: 1,
              backgroundColor: '#ff3b5c',
              padding: 14,
              marginLeft: 8,
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 16 }}>
          Similar Products
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {similarProducts.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.push('ProductDetails', { product: item })}
              style={{ marginLeft: 16 }}
            >
              <Image
                source={item.images && item.images.length > 0 ? item.images[0] : null}
                style={{ width: 120, height: 120, borderRadius: 10 }}
              />
              <Text numberOfLines={2} style={{ width: 120, marginTop: 6 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}
