import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../modules/products/store/productsSlice';
import usersReducer from '../../modules/users/store/usersSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
