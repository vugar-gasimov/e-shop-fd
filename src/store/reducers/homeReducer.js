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

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get products method

export const product_price_range = createAsyncThunk(
  'products/product_price_range',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/product-price-range');
      // console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get product price range method

export const query_products = createAsyncThunk(
  'products/query_products',
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ''
        }`
      );
      // console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get product price range method

export const product_details = createAsyncThunk(
  'products/product_details',
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product-details/${slug}`);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get product details method

export const customer_review = createAsyncThunk(
  'review/customer_review',
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post('/home/customer/submit-review', info);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of post customer review method

export const get_reviews = createAsyncThunk(
  'review/get_reviews',
  async ({ productId, pageNumber }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-reviews/${productId}?pageNu=${pageNumber}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get product reviews method

export const get_banners = createAsyncThunk(
  'banner/get_banners',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get/banners`);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong');
    }
  }
); // End of get banners method

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    categories: [],
    products: [],
    totalProducts: 0,
    perPage: 3,
    latest_products: [],
    topRated_products: [],
    discounted_products: [],
    priceRange: {
      low: 0,
      high: 100,
    },
    product: {},
    relatedProducts: [],
    sameVendorProducts: [],
    loading: false,
    successMessage: '',
    errorMessage: '',
    totalReview: 0,
    rating_review: [],
    reviews: [],
    banners: [],
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
      })

      .addCase(getCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to fetch categories';
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
        state.errorMessage = payload.error || 'Failed to fetch products';
      })
      .addCase(product_price_range.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })

      .addCase(product_price_range.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.latest_products = payload.latest_products;
        state.priceRange = payload.priceRange;

        state.successMessage = 'Products price range fetched successfully!';
      })

      .addCase(product_price_range.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage =
          payload.error || 'Failed to fetch products price range';
      })
      .addCase(query_products.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })

      .addCase(query_products.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.products;
        state.totalProducts = payload.totalProducts;
        state.perPage = payload.perPage;

        state.successMessage = 'Products query fetched successfully!';
      })

      .addCase(query_products.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to fetch query products';
      })
      .addCase(product_details.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })

      .addCase(product_details.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.product = payload.product;
        state.relatedProducts = payload.relatedProducts;
        state.sameVendorProducts = payload.sameVendorProducts;
      })

      .addCase(product_details.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to fetch Product details';
      })
      .addCase(customer_review.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })

      .addCase(customer_review.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage =
          payload.message || 'Product review submitted successfully';
      })

      .addCase(customer_review.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage =
          payload.error || 'Failed to submitted Product review';
      })
      .addCase(get_reviews.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(get_reviews.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.totalReview = payload.totalReview;
        state.rating_review = payload.rating_review;
        state.reviews = payload.reviews;
      })
      .addCase(get_reviews.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.error || 'Failed to get Product reviews';
      })
      .addCase(get_banners.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.banners = payload.banners;
      });
  },
});

export const { clearMessages } = homeReducer.actions;

export default homeReducer.reducer;
