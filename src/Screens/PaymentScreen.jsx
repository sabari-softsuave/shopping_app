import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function PaymentScreen({ navigation }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('VISA');

  // Calculate totals
  const itemsTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingFee = 30;
  const grandTotal = itemsTotal + shippingFee;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.spacer} />

      {/* SUMMARY */}
      <View style={styles.summary}>
        <Row label="Order" value={`₹ ${itemsTotal}`} />
        <Row label="Shipping" value={`₹ ${shippingFee}`} />
        <Row label="Total" value={`₹ ${grandTotal}`} bold />
      </View>

      {/* PAYMENT METHODS */}
      <Text style={styles.sectionTitle}>Payment</Text>

      <PaymentOption
        label="VISA"
        card="********2109"
        selected={selectedPayment === 'VISA'}
        onPress={() => setSelectedPayment('VISA')}
      />
      <PaymentOption
        label="PayPal"
        card="********2109"
        selected={selectedPayment === 'PayPal'}
        onPress={() => setSelectedPayment('PayPal')}
      />
      <PaymentOption
        label="MasterCard"
        card="********2109"
        selected={selectedPayment === 'MasterCard'}
        onPress={() => setSelectedPayment('MasterCard')}
      />
      <PaymentOption
        label="Apple Pay"
        card="********2109"
        selected={selectedPayment === 'Apple Pay'}
        onPress={() => setSelectedPayment('Apple Pay')}
      />

      {/* CONTINUE */}
      <TouchableOpacity style={styles.button} onPress={() => setShowSuccess(true)}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {showSuccess && (
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={styles.checkCircle}>
              <Text style={styles.check}>✓</Text>
            </View>

            <Text style={styles.successText}>
              Payment done successfully.
            </Text>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MainApp' }],
                })
              }
            >
              <Text style={styles.homeText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
}

/* REUSABLE COMPONENTS */

const Row = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={[styles.text, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.text, bold && styles.bold]}>{value}</Text>
  </View>
);

const PaymentOption = ({ label, card, selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.paymentCard, selected && styles.active]}>
    <Text style={styles.paymentText}>{label}</Text>
    <Text style={styles.cardText}>{card}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  summary: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  text: {
    fontSize: 14,
  },

  bold: {
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16,
  },

  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    marginBottom: 12,
  },

  active: {
    borderWidth: 1,
    borderColor: '#ff3b5c',
    backgroundColor: '#fff',
  },

  paymentText: {
    fontWeight: 'bold',
  },

  cardText: {
    color: '#555',
  },

  button: {
    backgroundColor: '#ff3b5c',
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff3b5c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  check: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  successText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
  },

  homeButton: {
    backgroundColor: '#ff3b5c',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },

  homeText: {
    color: '#fff',
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
