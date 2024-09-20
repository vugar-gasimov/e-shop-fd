import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const place_order = createAsyncThunk(
  'order/place_order',
  async ({
    price,
    products,
    shipping_fee,
    items,
    shippingInfo,
    userId,
    navigate,
  }) => {
    try {
      const { data } = await api.post('/home/order/place-order', {
        price,
        products,
        shipping_fee,
        items,
        shippingInfo,
        userId,
        navigate,
      });
      navigate('/payment', {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error.response?.data || 'Something went wrong');
    }
  }
); // End of place order method

// export const place_order = createAsyncThunk(
//   'order/place_order',
//   async (info, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const { data } = await api.post('/home/product/add-to-cart', info);

//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Something went wrong');
//     }
//   }
// ); // End of customer register method

export const orderReducer = createSlice({
  name: 'order',
  initialState: {
    myOrder: {},
    myOrders: [],
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
    // builder
    //   .addCase(add_to_cart.pending, (state) => {
    //     state.loading = true;
    //     state.errorMessage = '';
    //   })
    //   .addCase(add_to_cart.rejected, (state, { payload }) => {
    //     state.loading = false;
    //     state.errorMessage = payload.error || 'Failed to add product to cart.';
    //   })
    //   .addCase(add_to_cart.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //     state.successMessage =
    //       payload.message || 'Product added to cart successfully.';
    //     state.cart_products_count = state.cart_product_count + 1;
    //   })
  },
});

export const { clearMessages } = orderReducer.actions;

export default orderReducer.reducer;
