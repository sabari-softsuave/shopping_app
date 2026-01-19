import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function CheckoutSummaryScreen({ navigation, route }) {
  const { cartItems } = useCart();
  const addressData = route.params?.addressData;

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
        {/* Address */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.cardTitle}>Delivery Address</Text>
            <Ionicons name="add-circle-outline" size={22} />
          </View>

          <Text style={styles.address}>
            Address :{"\n"}
            {addressData ?
              `${addressData.address || ''}\n${addressData.city || ''} ${addressData.pincode || ''}\n${addressData.state || ''} ${addressData.country || ''}`
              :
              "216 St Paul's Rd, London N12LL, UK\nContact : +44-784322"
            }
          </Text>
        </View>

        {/* Shopping List */}
        <View style={{ backgroundColor: "white", padding: 18, borderRadius: 10 }}>
          <Text style={styles.sectionTitle}>Shopping Lists</Text>

          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              image={item.images && item.images.length > 0 ? item.images[0] : null}
              title={item.name}
              variants={item.category || 'Standard'}
              price={`₹ ${item.price}`}
              rating={item.rating || '4.5'}
              quantity={item.quantity}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

/* Reusable Item */
const CartItem = ({ image, title, variants, price, rating, quantity }) => (
  <View style={styles.cartItem}>
    <Image source={image} style={styles.productImage} />

    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.variant}>Variations: {variants}</Text>

      <View style={styles.row}>
        <Text style={styles.rating}>⭐ {rating}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      <Text style={styles.totalOrder}>Total Order ({quantity}): {price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
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
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  address: {
    marginTop: 10,
    fontSize: 13,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  productTitle: {
    fontWeight: '600',
  },
  variant: {
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },
  rating: {
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
    color: '#ff3b5c',
  },
  totalOrder: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  nextButton: {
    backgroundColor: '#ff3b5c',
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    height: 1,
    marginHorizontal: -17,
    backgroundColor: '#E0E0E0',
    width: '110%',
    marginVertical: 15,
  },
});
