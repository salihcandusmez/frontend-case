/**
 * usersSlice
 * Redux slice for managing user state: list, loading, error, add, update, remove.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from '../api/usersApi';
import type { User } from '../../../mock/types/user';

/**
 * Users state shape
 */
export interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch users (mock API)
 */
export const getUsers = createAsyncThunk<User[]>('users/getUsers', async () => {
  return await fetchUsers();
});

/**
 * Main users slice
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Add a new user
     */
    addUser(state, action: PayloadAction<User>) {
      state.items.push(action.payload);
    },
    /**
     * Update an existing user
     */
    updateUser(state, action: PayloadAction<User>) {
      const updated = action.payload;
      const idx = state.items.findIndex((item) => item.id === updated.id);
      if (idx !== -1) {
        state.items[idx] = updated;
      }
    },
    /**
     * Remove a user by id
     */
    removeUser(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { addUser, updateUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
