import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = (getState) => ({
  headers: { Authorization: `Bearer ${getState().auth.admin?.token}` },
});

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async ({ page = 1, limit = 10, search = '' }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/users?page=${page}&limit=${limit}&search=${search}`,
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/users/${id}`,
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'users/updateRole',
  async ({ id, role }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/users/${id}/role`,
        { role },
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${API_URL}/users/${id}`,
        getAuthHeader(thunkAPI.getState)
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  users: [],
  currentUser: null,
  total: 0,
  pages: 0,
  currentPage: 1,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.page;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.users.findIndex(u => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.users = state.users.filter(u => u._id !== action.payload);
      });
  },
});

export const { reset, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;