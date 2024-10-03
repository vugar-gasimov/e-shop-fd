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

export const send_message = createAsyncThunk(
  'chat/send_message',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/chat/customer/send-message', info);

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
    friendMessages: [],
    currentFriend: '',
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
      .addCase(add_friend.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(add_friend.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage =
          payload.error || 'Failed chat post customer friend';
      })
      .addCase(add_friend.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage =
          payload.message || 'Friend added to chat successfully';
        state.friendMessages = payload.messages || [];
        state.my_friends = payload.myFriends || [];
        state.currentFriend = payload.currentFd || '';
      })
      .addCase(send_message.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(send_message.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to send message';
      })
      .addCase(send_message.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage =
          payload.message || 'Message has been sent successfully';
        let tempFriends = state.my_friends;
        let friendIndex = tempFriends.findIndex(
          (f) => f.fdId === payload.newMessage.receiverId
        );
        while (friendIndex > 0) {
          let temp = tempFriends[friendIndex];
          tempFriends[friendIndex] = tempFriends[friendIndex - 1];
          tempFriends[friendIndex - 1] = temp;
          friendIndex--;
        }
        state.my_friends = tempFriends || [];
        state.friendMessages =
          [...state.friendMessages, payload.newMessage] || [];
      });
  },
});

export const { clearMessages } = chatReducer.actions;

export default chatReducer.reducer;
