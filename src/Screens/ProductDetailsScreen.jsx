import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import PaginationDots from '../Components/PaginationDots';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, deleteFromCart, removeFromCart, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  const isInWishlistState = isInWishlist(product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveSlide(roundIndex);
  };

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        // Fetch products by category, which acts as a "tag" for similarity
        const response = await fetch(`https://dummyjson.com/products/category/${product.category}?limit=10`);
        const data = await response.json();

        let fetchedProducts = data.products
          .filter(p => p.id !== product.id)
          .map(p => ({
            id: p.id,
            name: p.title,
            price: p.price,
            description: p.description,
            images: p.images.map(url => ({ uri: url })),
            rating: p.rating,
            reviews: 50,
            category: p.category,
          }));

        setSimilarProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    const fetchProductReviews = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${product.id}`);
        const data = await response.json();
        if (data.reviews) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (product.category) {
      fetchSimilarProducts();
    }
    if (product.id) {
      fetchProductReviews();
    }
  }, [product]);

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
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} style={{ fontSize: 20, margin: 10, }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 7, alignItems: 'end', justifyContent: 'end', marginBottom: -20, }}>{product.name}</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#D3D3D3', marginBottom: 15, }} />
        <View style={{ position: 'relative' }}>
          {product.images && product.images.length > 0 ? (
            <View>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{ width: width, height: 260 }}
              >
                {product.images.map((img, index) => (
                  <View key={index} style={{ width: width, alignItems: 'center' }}>
                    <Image
                      source={img}
                      style={{ height: 260, width: '100%', resizeMode: 'contain' }}
                    />
                  </View>
                ))}
              </ScrollView>
              <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                <PaginationDots total={product.images.length} current={activeSlide} />
              </View>
            </View>
          ) : (
            <Image
              source={null}
              style={{ height: 260, width: '100%' }}
            />
          )}
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
          {isInCart ? (
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: 8,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ff3b5c',
              borderRadius: 8,
              padding: 4, // reduced padding to fit buttons
              height: 50
            }}>
              <TouchableOpacity
                onPress={() => removeFromCart(product)}
                style={{ paddingHorizontal: 15 }}
              >
                <Ionicons name="remove" size={24} color="#ff3b5c" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ff3b5c' }}>
                {cartItems.find(item => item.id === product.id)?.quantity || 1}
              </Text>
              <TouchableOpacity
                onPress={() => addToCart(product)}
                style={{ paddingHorizontal: 15 }}
              >
                <Ionicons name="add" size={24} color="#ff3b5c" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleCartAction}
              style={{
                flex: 1,
                backgroundColor: '#ff3b5c',
                borderWidth: 1,
                borderColor: '#ff3b5c',
                padding: 14,
                marginRight: 8,
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          )}

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

        <View style={{ height: 1, backgroundColor: '#D3D3D3', marginTop: 10, }} />
        {similarProducts.length > 0 && (
          <>
            <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 16, marginTop: 10, }}>
              Similar Products
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => navigation.push('ProductDetails', { product: item })}
                  style={{ marginLeft: 16, marginBottom: 16, borderWidth: 1, borderColor: '#D3D3D3', overflow: 'hidden', borderRadius: 8, paddingLeft: 10, }}
                >
                  <Image
                    source={item.images && item.images.length > 0 ? item.images[0] : null}
                    style={{ width: 120, height: 120, borderRadius: 10 }}
                  />
                  <Text numberOfLines={2} style={{ width: 120, marginTop: 6 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#ff3b5c', marginTop: 4 }}>
                    ₹ {item.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        <View style={{ height: 1, backgroundColor: '#D3D3D3' }} />
        {/* Customer Reviews Section */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
            Customer Reviews
          </Text>

          {reviews.length === 0 ? (
            <Text style={{ color: '#666', fontStyle: 'italic' }}>No reviews available.</Text>
          ) : (
            reviews.map((review, index) => (
              <View key={index} style={{ marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{review.reviewerName}</Text>
                  <Text style={{ fontSize: 12, color: '#888' }}>{new Date(review.date).toLocaleDateString()}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < review.rating ? "star" : "star-outline"}
                      size={14}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <Text style={{ fontSize: 14, color: '#444' }}>{review.comment}</Text>
                <View style={{ height: 1, backgroundColor: '#D3D3D3', marginTop: 10, }} />
              </View>
            ))
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
