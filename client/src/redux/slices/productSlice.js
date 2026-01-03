import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


// Fetch all products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/products");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Error fetching products");
        }
    }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Error fetching product");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        current: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // All products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Single product
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.current = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
