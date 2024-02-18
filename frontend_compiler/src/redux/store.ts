import { configureStore } from '@reduxjs/toolkit';
import comilerSlice from './slices/comilerSlice';
export const store = configureStore({
    reducer: {
        comilerSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>