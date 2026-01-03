import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    items: [],
    loading: false,
    error: null,
    total: 0,
};

// Fetch cart from backend
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/cart");
            return response.data.items; // assuming backend returns { items: [...] }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Error fetching cart");
        }
    }
);

// Add item to cart
export const addItemToCart = createAsyncThunk(
    "cart/addItem",
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const response = await api.post("/cart/add", { productId, quantity });
            return response.data.items;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Error adding to cart");
        }
    }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
    "cart/removeItem",
    async (itemId, thunkAPI) => {
        try {
            const response = await api.delete(`/cart/remove/${itemId}`);
            return response.data.items;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Error removing from cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
