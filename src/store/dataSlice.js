// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../api/api'; // Adjust the import path

// Define the initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null,
  addedItems: [],
  cart: {
    items: [], // Array to store items in the cart
  },
  favorites: [],
};

// Create an asynchronous thunk for fetching API data
export const fetchDataAsync = createAsyncThunk('data/fetchData', async () => {
  const data = await fetchData();
  return data;
});

// Create a slice with reducers and actions
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: 1, // Default quantity when adding to the cart
      };

      // Check if the item is already in the cart
      const existingItem = state.cart.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // If the item is already in the cart, update the quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add it
        state.cart.items.push(newItem);
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;

      // Find the item in the cart
      const itemToUpdate = state.cart.items.find(item => item.id === itemId);

      if (itemToUpdate) {
        // If the item is found, update the quantity
        itemToUpdate.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      // Remove the item from the cart based on its ID
      state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
    },
    addToFavorites: (state, action) => {
      const newItem = action.payload;
      // Check if the item is already in favorites
      if (!state.favorites.some(item => item.id === newItem.id)) {
        state.favorites.push(newItem);
      }
    },
    removeFromFavorites: (state, action) => {
      const itemIdToRemove = action.payload;
      // Remove the item from favorites based on its ID
      state.favorites = state.favorites.filter(item => item.id !== itemIdToRemove);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDataAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  addToFavorites,
  removeFromFavorites,
} = dataSlice.actions;

export default dataSlice.reducer;
