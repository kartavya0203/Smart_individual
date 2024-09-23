import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/cartview/";

const getAuthToken = () => localStorage.getItem("auth_token"); // Function to get the token

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Token ${getAuthToken()}`, // Use Token for authorization
        },
      });
      return response.data || []; // Return empty array if no data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const payload = {
        product_id: item.id,
        product_quantity: item.quantity || 1,
      };
      const response = await axios.post(API_BASE_URL, payload, {
        headers: {
          Authorization: `Token ${getAuthToken()}`, // Use Token for authorization
        },
      });
      dispatch(fetchCart()); // Refresh cart after adding item
      toast.success(`${item.product_name} has been added to your cart!`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}${id}/`, {
        headers: {
          Authorization: `Token ${getAuthToken()}`, // Use Token for authorization
        },
      });
      dispatch(fetchCart()); // Refresh cart after removal
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}clear/`, {
        headers: {
          Authorization: `Token ${getAuthToken()}`, // Use Token for authorization
        },
      });
      dispatch(fetchCart()); // Refresh cart after clearing
      return [];
    } catch (err) {
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
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
