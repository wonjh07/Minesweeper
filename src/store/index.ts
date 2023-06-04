import { configureStore } from '@reduxjs/toolkit';
import minesReducer from './minesSlice';

export const store = configureStore({
  reducer: { mines: minesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
