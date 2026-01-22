import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import CartProductCard from '../Components/CartProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart } from '../redux/slices/cartSlice';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerRow}>
        <Text style={styles.title}>Shopping Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.checkoutBtnTop}>
            <Text style={styles.checkoutTextTop}>Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <CartProductCard
            item={item}
            handleDeleteCart={(i) => dispatch(deleteFromCart(i.id))}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 16, color: '#777' }}>Your cart is empty</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 10,
    paddingRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  checkoutBtnTop: {
    backgroundColor: '#F83758',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  checkoutTextTop: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
