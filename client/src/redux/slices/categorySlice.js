// src/redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    list: [],
    loading: false,
    error: null,
};

// Fetch all categories from backend
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/categories"); // /api/categories in backend
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Error fetching categories");
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory(state, action) {
            state.list.push(action.payload);
        },
        removeCategory(state, action) {
            state.list = state.list.filter((cat) => cat._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;
