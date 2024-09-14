import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const add_to_cart = createAsyncThunk(
  'cart/add_to_cart',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/home/product/add-to-cart', info);
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of customer register method

export const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    cart_products: [],
    wish_products: [],
    cart_product_count: 0,
    wish_product_count: 0,
    shipping_fee: 0,
    price: 0,
    out_of_stock: [],
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
      .addCase(add_to_cart.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(add_to_cart.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to add product to cart.';
      })
      .addCase(add_to_cart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage =
          payload.message || 'Product added to cart successfully.';
        state.cart_product_count = state.cart_product_count + 1;
      });
  },
});

export const { clearMessages } = cartReducer.actions;

export default cartReducer.reducer;
