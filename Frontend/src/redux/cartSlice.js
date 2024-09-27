import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = "http://localhost:8000/api/v1/cartview/";

const getAuthToken = () => localStorage.getItem("auth_token");

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    if (getAuthToken()) {
      try {
        const response = await axios.get(API_BASE_URL, {
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        });
        return response.data || [];
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    } else {
      const sessionCart = JSON.parse(localStorage.getItem('session_cart')) || [];
      return sessionCart;
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    if (getAuthToken()) {
      try {
        const payload = {
          product_id: item.id,
          product_quantity: item.quantity || 1,
        };
        const response = await axios.post(API_BASE_URL, payload, {
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        });
        toast.success(`${item.product_name} has been added to your cart!`);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    } else {
      const sessionCart = JSON.parse(localStorage.getItem('session_cart')) || [];
      const existingItem = sessionCart.find(i => i.product_id === item.id);

      if (existingItem) {
        existingItem.quantity += (item.quantity || 1);
      } else {
        sessionCart.push({
          product_id: item.id,
          product_name: item.product_name,
          product_price: item.price,
          quantity: item.quantity || 1,
        });
      }

      localStorage.setItem('session_cart', JSON.stringify(sessionCart));
      toast.success(`${item.product_name} has been added to your session cart!`);
      return sessionCart;
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    if (getAuthToken()) {
      try {
        const response = await axios.patch(`${API_BASE_URL}${id}/`, { quantity }, {
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    } else {
      const sessionCart = JSON.parse(localStorage.getItem('session_cart')) || [];
      const updatedCart = sessionCart.map(item => {
        if (item.product_id === id) {
          const newQuantity = Math.max(item.quantity + quantity, 0);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);

      localStorage.setItem('session_cart', JSON.stringify(updatedCart));
      return updatedCart;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    if (getAuthToken()) {
      try {
        await axios.delete(`${API_BASE_URL}${id}/`, {
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        });
        const response = await axios.get(API_BASE_URL, {
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    } else {
      const sessionCart = JSON.parse(localStorage.getItem('session_cart')) || [];
      const updatedCart = sessionCart.filter(item => item.product_id !== id);
      localStorage.setItem('session_cart', JSON.stringify(updatedCart));
      return updatedCart;
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    if (getAuthToken()) {
      try {
        await axios.delete(`${API_BASE_URL}clear/`, {
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        });
        return [];
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    } else {
      localStorage.removeItem('session_cart');
      return [];
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
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update state immediately after successful update
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
