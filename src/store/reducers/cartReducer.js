import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const add_to_cart = createAsyncThunk(
  'cart/add_to_cart',
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post('/home/product/add-to-cart', info);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of customer register method

export const get_cart_products = createAsyncThunk(
  'cart/get_cart_products',
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-cart-products/${userId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of get cart products method

export const remove_cart_product = createAsyncThunk(
  'cart/remove_cart_product',
  async (cartId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/remove-cart-product/${cartId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of remove cart product method

export const quantity_increment = createAsyncThunk(
  'cart/quantity_increment',
  async (cartId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-increment/${cartId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of remove cart product method

export const quantity_decrement = createAsyncThunk(
  'cart/quantity_decrement',
  async (cartId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-decrement/${cartId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
); // End of remove cart product method

export const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    cart_products: [],
    wish_products: [],
    cart_products_count: 0,
    wish_products_count: 0,
    buy_product_item: 0,
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
        state.cart_products_count = state.cart_product_count + 1;
      })
      .addCase(get_cart_products.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(get_cart_products.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to fetch cart products.';
      })
      .addCase(get_cart_products.fulfilled, (state, { payload }) => {
        state.cart_products = payload.cart_products;
        state.price = payload.price;
        state.cart_products_count = payload.cart_products_count;
        state.shipping_fee = payload.shipping_fee;
        state.out_of_stock = payload.outOfStockProducts;
        state.buy_product_item = payload.buy_product_item;
        state.loading = false;
      })
      .addCase(remove_cart_product.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Product removed successfully.';
        state.loading = false;
      })
      .addCase(quantity_increment.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Product Incremented successfully.';
        state.loading = false;
      })
      .addCase(quantity_decrement.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Product decremented successfully.';
        state.loading = false;
      });
  },
});

export const { clearMessages } = cartReducer.actions;

export default cartReducer.reducer;