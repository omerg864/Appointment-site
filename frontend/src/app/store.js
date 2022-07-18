import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dayReducer from '../features/day/daySlice';
import appointmentReducer from '../features/appointment/appointmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    day: dayReducer,
    appointment: appointmentReducer
  },
});
