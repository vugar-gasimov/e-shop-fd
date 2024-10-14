import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

export const customer_register = createAsyncThunk(
  'auth/customer_register',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-register', info);
      localStorage.setItem('customerToken', data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of customer register method

export const customer_login = createAsyncThunk(
  'auth/customer_login',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-login', info);
      localStorage.setItem('customerToken', data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of customer login method

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return null;
  }
}; // End of decode token

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    userInfo: decodeToken(localStorage.getItem('customerToken')),
    loading: false,
    successMessage: '',
    errorMessage: '',
  },
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
    user_reset: (state, _) => {
      state.userInfo = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to register customer';
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.loading = false;
        state.successMessage = payload.message || 'Registration successful!';
        state.userInfo = userInfo;
      })
      .addCase(customer_login.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to Login customer';
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.loading = false;
        state.successMessage = payload.message || 'Login successful!';
        state.userInfo = userInfo;
      });
  },
});

export const { clearMessages, user_reset } = authReducer.actions;

export default authReducer.reducer;
