import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import apiClient from "../../lib/api-client";
import type { ProductFilters, IProduct } from "../../types/product.type";

// Async thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk<
  IProduct[],
  ProductFilters
>(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await apiClient.get<IProduct[]>(
      `/products?${query.toString()}`
    );
    return response;
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk<IProduct, string>(
  "products/fetchProductDetails",
  async (id: string) => {
    const response = await apiClient.get<IProduct>(`/products/${id}`);
    return response;
  }
);

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk<IProduct[], string>(
  "products/fetchSimilarProducts",
  async (id: string) => {
    const response = await apiClient.get<IProduct[]>(`/products/similar/${id}`);
    return response;
  }
);

// Async thunk to update product details (admin)
export const updateProductDetails = createAsyncThunk<
  IProduct,
  { id: string; productData: IProduct }
>("products/updateProduct", async ({ id, productData }) => {
  const response = await apiClient.put<IProduct>(
    `/products/${id}`,
    productData
  );
  return response;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as IProduct[],
    selectedProduct: null as IProduct | null,
    similarProducts: [] as IProduct[],
    loading: false,
    error: null as string | null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
    } as ProductFilters,
  },
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // Handle fetching single product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product details";
      })

      // Handle fetching similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch similar products";
      })

      // Handle updating product details
      .addCase(updateProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const updatedId = updated._id ?? updated.id;
        const index = state.products.findIndex(
          (p) => (p._id ?? p.id) === updatedId
        );
        if (index !== -1) {
          state.products[index] = updated;
        }
      })
      .addCase(updateProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to update product details";
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
