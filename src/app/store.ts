import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import type { AuthState } from '../features/auth/authSlice';

export interface RootState {
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
