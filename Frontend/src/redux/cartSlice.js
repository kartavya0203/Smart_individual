import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming you're using axios for API calls

// API base URL
const API_BASE_URL = "http://localhost:8000/api/v1/cartview";

// Async thunks for API calls
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  const response = await axios.post(`${API_BASE_URL}`, item);
  return response.data;
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    await axios.delete(`${API_BASE_URL}${id}`);
    return id;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  await axios.delete(`${API_BASE_URL}`);
  return [];
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
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.name !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export default cartSlice.reducer;
