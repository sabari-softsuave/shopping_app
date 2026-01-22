import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import WishlistProductCard from '../Components/WishlistProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';

export default function WishlistScreen({ navigation }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>My Wishlist</Text>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <WishlistProductCard
            item={item}
            handleRemoveWishList={(id) => dispatch(removeFromWishlist(id))}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Your wishlist is empty</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  flatListContent: {
    paddingBottom: 100,
  },
});