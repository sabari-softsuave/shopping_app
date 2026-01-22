import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === product.id);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter((item) => item.id !== product.id);
                }
            }
        },
        deleteFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== productId);
        },
    },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
