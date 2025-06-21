/**
 * productsSlice
 * Redux slice for managing product state using async thunks for API calls.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getProducts as apiGetProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from '../api/productsApi';
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

// --- Async Thunks ---

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await apiGetProducts();
      return products;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const addProduct = createAsyncThunk<Product, Omit<Product, 'id'>>(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const newProduct = await apiCreateProduct(product);
      return newProduct;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  'products/updateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const updatedProduct = await apiUpdateProduct(product);
      return updatedProduct;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const removeProduct = createAsyncThunk<string, string>(
  'products/removeProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await apiDeleteProduct(productId);
      return productId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Product
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Remove Product
      .addCase(removeProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      });
  },
});

export const { toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;
