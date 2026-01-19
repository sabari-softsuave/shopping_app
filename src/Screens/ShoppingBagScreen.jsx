import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function ShoppingBagScreen({ navigation }) {
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalPrice = calculateTotal();

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Shopping Bag ({cartItems.length})</Text>

        <Ionicons name="heart-outline" size={22} />
      </View>

      <View style={styles.spacer} />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {cartItems.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#777' }}>Your bag is empty.</Text>
          </View>
        ) : (
          cartItems.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image
                source={item.images && item.images.length > 0 ? item.images[0] : null}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productMeta}>{item.category || 'Product'}</Text>

                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.qtyButton}>
                    <Ionicons name="remove" size={18} color="black" />
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <TouchableOpacity onPress={() => addToCart(item)} style={styles.qtyButton}>
                    <Ionicons name="add" size={18} color="black" />
                  </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 8 }}>₹ {item.price * item.quantity}</Text>
                <Text style={styles.delivery}>Delivery by 10 May, 20XX</Text>
              </View>
            </View>
          ))
        )}

        {/* COUPON */}
        <View style={styles.row}>
          <Text style={styles.bold}>Apply Coupons</Text>
          <Text style={styles.link}>Select</Text>
        </View>

        {/* PAYMENT DETAILS */}
        <View style={styles.card}>
          <Text style={styles.bold}>Order Payment Details</Text>

          <Row label="Order Amounts" value={`₹ ${totalPrice}`} />
          <Row label="Convenience" value="Know More" link />
          <Row label="Delivery Fee" value="Free" highlight />
        </View>

        {/* TOTAL */}
        <View style={styles.card}>
          <Row label="Order Total" value={`₹ ${totalPrice}`} bold />
          <Row label="EMI Available" value="Details" link />
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.total}>₹ {totalPrice}</Text>
          <Text style={styles.link}>View Details</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.payText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* REUSABLE ROW */
const Row = ({ label, value, bold, link, highlight }) => (
  <View style={styles.rowBetween}>
    <Text style={[styles.text, bold && styles.bold]}>{label}</Text>
    <Text
      style={[
        styles.text,
        bold && styles.bold,
        link && styles.link,
        highlight && styles.free,
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  productCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  productImage: {
    width: 90,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#eee',
  },

  productInfo: {
    marginLeft: 12,
    flex: 1,
  },

  productTitle: {
    fontWeight: '600',
    fontSize: 14,
  },

  productMeta: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },

  delivery: {
    fontSize: 12,
    color: '#000',
    marginTop: 6,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  card: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  text: {
    fontSize: 13,
    color: '#444',
  },

  bold: {
    fontWeight: 'bold',
  },

  link: {
    color: '#ff3b5c',
  },

  free: {
    color: 'green',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  total: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  payButton: {
    backgroundColor: '#ff3b5c',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  payText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spacer: {
    height: 1,
    marginHorizontal: -17,
    backgroundColor: '#E0E0E0',
    width: '110%',
    marginVertical: 0,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '600',
  },
});
