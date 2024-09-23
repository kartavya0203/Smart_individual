import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/cartview/";

// Helper function to log requests
const logRequest = (actionType, data) => {
  console.log(`${actionType} - Request:`, data);
};

// Helper function to log responses
const logResponse = (actionType, data) => {
  console.log(`${actionType} - Response:`, data);
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      logRequest("fetchCart", "GET request");
      const response = await axios.get(API_BASE_URL);
      logResponse("fetchCart", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const payload = {
        product_id: item.id,
        product_quantity: item.quantity || 1,
      };
      logRequest("addToCart", payload);
      const response = await axios.post(API_BASE_URL, payload);
      logResponse("addToCart", response.data);
      return response.data;
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      logRequest("removeFromCart", `DELETE ${API_BASE_URL}${id}/`);
      await axios.delete(`${API_BASE_URL}${id}/`);
      logResponse("removeFromCart", `Item ${id} removed`);
      return id;
    } catch (err) {
      console.error("Error removing from cart:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      logRequest("clearCart", "DELETE request");
      await axios.delete(API_BASE_URL);
      logResponse("clearCart", "Cart cleared");
      return [];
    } catch (err) {
      console.error("Error clearing cart:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

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
        console.log("Cart fetched successfully:", state.items);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Failed to fetch cart:", action.payload);
      })
      .addCase(addToCart.pending, (state, action) => {
        state.status = "loading";
        // Optimistically add the item
        state.items.push(action.meta.arg);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Replace the optimistic item with the server response
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        console.log("Item added to cart successfully:", action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Failed to add item to cart:", action.error);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
        console.log("Item removed from cart successfully:", action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Failed to remove item from cart:", action.payload);
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        console.log("Cart cleared successfully");
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Failed to clear cart:", action.payload);
      });
  },
});

export default cartSlice.reducer;