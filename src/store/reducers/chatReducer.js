import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const add_friend = createAsyncThunk(
  'chat/add_friend',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/chat/customer/add-friend', info);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of chat post add friend method

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
    //   .addCase(add_friend.pending, (state) => {
    //     state.errorMessage = '';
    //   })
    //   .addCase(add_friend.rejected, (state, { payload }) => {
    //     state.errorMessage = payload.error || 'Failed chat post customer friend';
    //   })
    //   .addCase(add_friend.fulfilled, (state, { payload }) => {
    //     const userInfo = decodeToken(payload.token);
    //     state.successMessage = payload.message || 'Posted customer friend successful!';
    //     state.userInfo = userInfo;
    //   });
  },
});

export const { clearMessages } = chatReducer.actions;

export default chatReducer.reducer;
