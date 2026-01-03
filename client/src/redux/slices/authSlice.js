import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";
import api from "../../services/api";

const inirialState = {
    user: null,
    loading: false,
    error: null,
}


export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            return await authService.login(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            return await authService.register(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
