import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const customer_register = createAsyncThunk(
  'auth/customer_register',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-register', info);
      localStorage.setItem('customerToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  }
);

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    loading: false,
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
      .addCase(customer_register.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.userInfo;
        state.successMessage = 'Registration successful!';
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload || 'Failed to register customer';
      });
  },
});

export const { clearMessages } = authReducer.actions;

export default authReducer.reducer;
