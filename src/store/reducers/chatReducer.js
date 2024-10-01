import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

// export const customer_login = createAsyncThunk(
//   'auth/customer_login',
//   async (info, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const { data } = await api.post('/customer/customer-login', info);
//       localStorage.setItem('customerToken', data.token);

//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Something went wrong');
//     }
//   }
// ); // End of customer login method

export const chatReducer = createSlice({
  name: 'chat',
  initialState: {
    my_friends: [],
    fb_messages: [],
    currentFd: '',

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
    // builder
    //   .addCase(customer_login.pending, (state) => {
    //     state.errorMessage = '';
    //   })
    //   .addCase(customer_login.rejected, (state, { payload }) => {
    //     state.errorMessage = payload.error || 'Failed to Login customer';
    //   })
    //   .addCase(customer_login.fulfilled, (state, { payload }) => {
    //     const userInfo = decodeToken(payload.token);
    //     state.successMessage = payload.message || 'Login successful!';
    //     state.userInfo = userInfo;
    //   });
  },
});

export const { clearMessages } = chatReducer.actions;

export default chatReducer.reducer;
