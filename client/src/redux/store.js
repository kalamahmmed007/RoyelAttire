import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// API slices
import { apiSlice } from './api/apiSlice';

// Regular slices
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import wishlistReducer from './slices/wishlistSlice';
import uiReducer from './slices/uiSlice';
import filterReducer from './slices/filterSlice';
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        // RTK Query API reducer
        [apiSlice.reducerPath]: apiSlice.reducer,

        // Regular reducers
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        ui: uiReducer,
        filter: filterReducer,
        categories: categoryReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }).concat(apiSlice.middleware),

    devTools: import.meta.env.MODE !== 'production',
});

// Enable refetchOnFocus and refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;