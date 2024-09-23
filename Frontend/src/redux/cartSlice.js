import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/cartview/";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  const response = await axios.post(API_BASE_URL, {product_id:item.id,product_quantity:item.quantity});
  return response.data.items;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id) => {
  await axios.delete(`${API_BASE_URL}${id}/`);  // Ensure correct URL format
  return id;  // Return the ID for filtering
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  await axios.delete(API_BASE_URL);  // Clear the entire cart
  return [];  // Return an empty array
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";  // Optional: Add loading state
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;  // Handle error
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);  // Use item ID for comparison
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export default cartSlice.reducer;
