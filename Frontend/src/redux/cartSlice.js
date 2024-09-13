import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: [],
  },

  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },

    removeFromCart: (state, action) => {
      console.log(action);
      state.cart = state.cart.filter(
        (cartItem) => cartItem.name !== action.payload
      );
    },

    clearCart: (state) => {
      state.cart.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
