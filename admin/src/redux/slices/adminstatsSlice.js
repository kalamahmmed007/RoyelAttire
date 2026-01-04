import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = (getState) => ({
  headers: { Authorization: `Bearer ${getState().auth.admin?.token}` },
});

export const getDashboardStats = createAsyncThunk(
  'stats/getDashboard',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/dashboard/stats`,
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getSalesData = createAsyncThunk(
  'stats/getSales',
  async ({ period = '7days' }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/analytics/sales?period=${period}`,
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  dashboardStats: {
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    recentOrders: [],
    topProducts: [],
  },
  salesData: [],
  isLoading: false,
  isError: false,
  message: '',
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
    updateStats: (state, action) => {
      state.dashboardStats = { ...state.dashboardStats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSalesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesData = action.payload;
      })
      .addCase(getSalesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, updateStats } = statsSlice.actions;
export default statsSlice.reducer;