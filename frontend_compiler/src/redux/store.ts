import { configureStore } from '@reduxjs/toolkit';
import comilerSlice from './slices/comilerSlice';
import { api } from './api';
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        comilerSlice,
    },
    middleware: (getDafaultMiddleware) => getDafaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>