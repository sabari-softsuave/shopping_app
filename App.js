import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </WishlistProvider>
  );
}