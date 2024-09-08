import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    categories: [],
  },
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {},
});

export default homeReducer.reducer;
