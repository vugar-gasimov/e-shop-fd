import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-categories');

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get category method

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-products');
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get products method

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    categories: [],
    products: [],
    latest_products: [],
    topRated_products: [],
    discounted_products: [],
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
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })

      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.products;
        state.latest_products = payload.latest_products;
        state.topRated_products = payload.topRated_products;
        state.discounted_products = payload.discounted_products;
        state.successMessage = 'Products fetched successfully!';
      })

      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.errorMessage || 'Failed to fetch products';
      });
  },
});

export const { clearMessages } = homeReducer.actions;

export default homeReducer.reducer;
