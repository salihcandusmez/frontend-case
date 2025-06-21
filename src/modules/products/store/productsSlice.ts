/**
 * productsSlice
 * Redux slice for managing product state: list, loading, error, favorites, add, update, remove, toggle favorite.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/productsApi';
import type { Product } from '../../../mock/types/product';

/**
 * Products state shape
 */
export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  favorites: string[]; // Favorite product ids
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  favorites: [],
};

/**
 * Async thunk to fetch products (mock API)
 */
export const getProducts = createAsyncThunk<Product[]>('products/getProducts', async () => {
  return await fetchProducts();
});

/**
 * Main products slice
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Toggle product favorite status
     */
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    /**
     * Add a new product
     */
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    /**
     * Update an existing product
     */
    updateProduct(state, action: PayloadAction<Product>) {
      const updated = action.payload;
      const idx = state.items.findIndex((item) => item.id === updated.id);
      if (idx !== -1) {
        state.items[idx] = updated;
      }
    },
    /**
     * Remove a product by id
     */
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Also remove from favorites
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { toggleFavorite, addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
