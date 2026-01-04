import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = (getState) => ({
  headers: { Authorization: `Bearer ${getState().auth.admin?.token}` },
});

export const getAllOrders = createAsyncThunk(
  'orders/getAll',
  async ({ page = 1, limit = 10, status = '' }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/orders?page=${page}&limit=${limit}&status=${status}`,
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/orders/${id}`,
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/orders/${id}/status`,
        { status },
        getAuthHeader(thunkAPI.getState)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${API_URL}/orders/${id}`,
        getAuthHeader(thunkAPI.getState)
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  total: 0,
  pages: 0,
  currentPage: 1,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    addNewOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    updateOrderInList: (state, action) => {
      const index = state.orders.findIndex(o => o._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.page;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?._id === action.payload._id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.orders = state.orders.filter(o => o._id !== action.payload);
      });
  },
});

export const { reset, clearCurrentOrder, addNewOrder, updateOrderInList } = orderSlice.actions;
export default orderSlice.reducer;