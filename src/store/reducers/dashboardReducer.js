import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_dashboard = createAsyncThunk(
  'dashboard/get_dashboard',
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-dashboard/${userId}`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of get dashboard index data method

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    recentOrders: [],
    totalOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    loader: false,
    successMessage: '',
    errorMessage: '',
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_dashboard.pending, (state) => {
        state.loader = true;
        state.errorMessage = '';
        state.successMessage = '';
      })
      .addCase(get_dashboard.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage =
          payload.message || 'Dashboard data fetched successfully!';
        state.recentOrders = payload.recentOrders;
        state.pendingOrders = payload.pendingOrders;
        state.totalOrders = payload.totalOrders;
        state.cancelledOrders = payload.cancelledOrders;
      })
      .addCase(get_dashboard.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload || 'Failed to fetch dashboard data';
      });
  },
});

export const { clearMessages } = dashboardReducer.actions;

export default dashboardReducer.reducer;
