import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dayReducer from '../features/day/daySlice';
import settingsReducer from '../features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    day: dayReducer,
    settings: settingsReducer
  },
});
