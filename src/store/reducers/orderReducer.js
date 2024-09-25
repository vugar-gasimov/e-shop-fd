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
      console.log(
        error.response?.data || 'An error occurred while placing the order'
      );
    }
  }
); // End of Async Thunk:  place order method

export const get_orders = createAsyncThunk(
  'order/get_orders',
  async ({ customerId, status }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'An error occurred while fetching orders'
      );
    }
  }
); // End of Async Thunk: get orders method

export const get_order_info = createAsyncThunk(
  'order/get_order_info',
  async (orderId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-order-info/${orderId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'An error occurred while fetching order info'
      );
    }
  }
); // End of Async Thunk: get order info method

export const orderReducer = createSlice({
  name: 'order',
  initialState: {
    myOrder: {},
    myOrders: [],
    loader: false,
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
      .addCase(get_orders.pending, (state) => {
        state.loader = true;
        state.errorMessage = '';
      })
      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage =
          payload.message || 'Orders fetched successfully!';
        state.myOrders = payload.orders;
      })
      .addCase(get_orders.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Failed to fetch orders.';
      })
      .addCase(get_order_info.pending, (state) => {
        state.loader = true;
        state.errorMessage = '';
      })
      .addCase(get_order_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage =
          payload.message || 'Order info fetched successfully!';
        state.myOrder = payload.order;
      })
      .addCase(get_order_info.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Failed to fetch orders.';
      });
  },
});

export const { clearMessages } = orderReducer.actions;

export default orderReducer.reducer;
