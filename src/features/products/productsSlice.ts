import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductsState {
  items: Product[];
  total: number;
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  selectedProduct: null,
  loading: false,
  error: null,
  searchQuery: '',
};

export const getProducts = createAsyncThunk<ProductsResponse, { search?: string } | undefined, { rejectValue: string }>(
  'products/getProducts',
  async (params, { rejectWithValue }) => {
    try {
      const search = params?.search ? `/search?q=${params.search}` : '';
      const response = await api.get<ProductsResponse>(`/products${search}`);
      return response.data;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch products');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getProductById = createAsyncThunk<Product, string | number, { rejectValue: string }>(
  'products/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch product details');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setSearchQuery, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;