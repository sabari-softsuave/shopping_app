import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity > 1) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
        // Remove item if quantity is 1
        return prev.filter(item => item.id !== product.id);
      }
      return prev;
    });
  };

  const deleteFromCart = (productId) => {
    setCartItems((prev) => prev.filter(item => item.id !== productId));
  };
  return (

    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
