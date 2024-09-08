import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-categories');
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get category method

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    categories: [],
    products: [],
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

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })

      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload.categories;
        state.successMessage = 'Categories fetched successfully!';
      })

      .addCase(getCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage =
          payload.errorMessage || 'Failed to fetch categories';
      });
  },
});

export const { clearMessages } = homeReducer.actions;

export default homeReducer.reducer;
