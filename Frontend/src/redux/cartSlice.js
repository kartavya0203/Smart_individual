import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/cartview/";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  const response = await axios.post(API_BASE_URL, {
    product_id: item.id,
    product_quantity: item.quantity || 1,
  });
  return response.data;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id) => {
  await axios.delete(`${API_BASE_URL}${id}/`);
  return id;
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  await axios.delete(API_BASE_URL);
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
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
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;