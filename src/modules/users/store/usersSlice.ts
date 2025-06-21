/**
 * usersSlice
 * Redux slice for managing user state using async thunks for API calls.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getUsers as apiGetUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from '../api/usersApi';
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

// --- Async Thunks ---

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await apiGetUsers();
      return users;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const addUser = createAsyncThunk<User, Omit<User, 'id'>>(
  'users/addUser',
  async (user, { rejectWithValue }) => {
    try {
      const newUser = await apiCreateUser(user);
      return newUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateUser = createAsyncThunk<User, User>(
  'users/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const updatedUser = await apiUpdateUser(user);
      return updatedUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const removeUser = createAsyncThunk<string, string>(
  'users/removeUser',
  async (userId, { rejectWithValue }) => {
    try {
      await apiDeleteUser(userId);
      return userId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

/**
 * Main users slice
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add User
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.items.push(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Remove User
      .addCase(removeUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
