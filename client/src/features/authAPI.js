import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../apis/axiosIntance";
import { toast } from "react-hot-toast";
import { setDeviceLimitError } from "./authSlice";

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/refreshToken");
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      console.log(response);
      return response.data.message;
    } catch (error) {
      console.log(error.response.data.message);
     return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const access = response.data.accessToken;
      localStorage.setItem("accessToken", access);
      const user = await axiosInstance.get("user/me");
      return user.data;
    } catch (error) {
      if (error.response.status === 429) {
        const devices = error.response.data.data;
        dispatch(setDeviceLimitError(devices));
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
      rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutDevice = createAsyncThunk(
  "auth/logoutDevice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/logout/${data}`);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data.message);
    }
  }
);
