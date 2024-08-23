import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./reduces/userSlice"

import { cryptoApi } from '../hooks/cryptoApi'

export const store = configureStore({
    reducer: {
        user: userReducer,
        // Add the generated reducer as a specific top-level slice
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware),
})

