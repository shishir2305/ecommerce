import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import apiClient from "../../lib/api-client";

// Helper function to get cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart: any) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk<
  any,
  { userId?: string; guestId?: string }
>("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/cart", {
      params: { userId, guestId },
    });
    return response;
  } catch (error) {
    return rejectWithValue("Failed to fetch cart");
  }
});

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk<
  any,
  {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    userId?: string;
    guestId?: string;
  }
>(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/cart", {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

// Update the quantity of a cart item
export const updateCartItem = createAsyncThunk<
  any,
  {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    userId?: string;
    guestId?: string;
  }
>(
  "cart/updateCartItem",
  async (
    { productId, quantity, size, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(`/cart`, {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to update cart item");
    }
  }
);

// Remove an item from the cart
export const removeCartItem = createAsyncThunk<
  any,
  {
    productId: string;
    userId?: string;
    guestId?: string;
    size: string;
    color: string;
  }
>(
  "cart/removeCartItem",
  async ({ productId, userId, guestId, size, color }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/cart`, {
        data: { productId, userId, guestId, size, color },
      });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to remove cart item");
    }
  }
);

// Merge guest cart into user cart upon login
export const mergeCarts = createAsyncThunk<
  any,
  { userId: string; guestId: string }
>("cart/mergeCart", async ({ userId, guestId }, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(`/cart/merge`, {
      userId,
      guestId,
    });
    return response;
  } catch (error) {
    return rejectWithValue("Failed to merge carts");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to add item to cart";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to update cart item";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to remove cart item";
      })
      .addCase(mergeCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(mergeCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to merge carts";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
