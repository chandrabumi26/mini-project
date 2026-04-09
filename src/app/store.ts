import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import type { AuthState } from '../features/auth/authSlice';

export interface RootState {
  auth: AuthState;
  products: ReturnType<typeof productsReducer>;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
