import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import productReducer from "./slices/product-slice";
import cartReducer from "./slices/cart-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
