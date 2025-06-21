/**
 * Redux Store Configuration
 *
 * This file configures and creates the main Redux store for the application.
 * It combines all the different reducers from the modules into a single root reducer.
 */
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../modules/products/store/productsSlice';
import usersReducer from '../../modules/users/store/usersSlice';

/**
 * The main Redux store instance.
 * `configureStore` simplifies the store setup process.
 * It automatically combines the slice reducers, adds the Redux Thunk middleware,
 * and enables the Redux DevTools Extension.
 */
const store = configureStore({
  // `reducer` is an object where each key corresponds to a slice of the state,
  // and its value is the reducer function for that slice.
  reducer: {
    products: productsReducer,
    users: usersReducer,
  },
});

/**
 * RootState Type
 * This type represents the entire state of the Redux store.
 * It's inferred from the store itself, so it will always be up-to-date
 * as new reducers are added.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch Type
 * This type represents the dispatch function of the store.
 * It's used to ensure that dispatched actions are correctly typed,
 * especially when using async thunks.
 */
export type AppDispatch = typeof store.dispatch;

export default store;
