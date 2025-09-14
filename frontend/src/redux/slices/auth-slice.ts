import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/api-client";
import type { IAuthResponse, IUserInfo } from "../../types/user-info.type";

// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

// Check for an existing guest ID in the localstorage or generate a new one
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
type AuthState = {
  user: IUserInfo | null;
  guestId: string;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk<
  IUserInfo,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<IAuthResponse>(
      "/auth/login",
      userData
    );
    localStorage.setItem("userInfo", JSON.stringify(response.user));
    // Store token under the same key api-client reads
    localStorage.setItem("userToken", response.accessToken);
    return response.user;
  } catch (error) {
    const message = (error as any)?.message || "Login failed";
    return rejectWithValue(message);
  }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk<
  IUserInfo,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<IAuthResponse>(
      "/auth/register",
      userData
    );
    localStorage.setItem("userInfo", JSON.stringify(response.user));
    localStorage.setItem("userToken", response.accessToken);
    return response.user;
  } catch (error) {
    const message = (error as any)?.message || "Registration failed";
    return rejectWithValue(message);
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId(state) {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
