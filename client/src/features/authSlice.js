import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../apis/axiosIntance";

// Login action
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken); // Store token
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Refresh token action
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token");
      localStorage.setItem("accessToken", response.data.accessToken); // Update token
      return response.data.accessToken;
    } catch (error) {
      return rejectWithValue("Token refresh failed");
    }
  }
);

// Logout action
export const logout = createAsyncThunk("auth/logout", async () => {
  await axiosInstance.post("/auth/logout");
  localStorage.removeItem("accessToken");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (state.account) {
          state.account.accessToken = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.account = null;
      });
  },
});

export default authSlice.reducer;
