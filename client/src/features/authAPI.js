import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../apis/axiosIntance";
import { setDeviceLimitError } from "./authSlice";
//-------------------------------------------

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/refreshToken");
      return response.data.accessToken;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Unknown error");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      console.log(response);
      return {
        message: response.data.message,
        verifyId: response.data.verificationId,
      };
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data.message;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ data, verifyId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/verify/${verifyId}`, {
        otp: data,
      });
      console.log(response.data);
      return response.data.message;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (verifyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/resend-verify/${verifyId}`
      );
      console.log(response.data);
      return response.data.message;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("user/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutAll = createAsyncThunk(
  "auth/logoutall",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/logoutall");
      return response.data.message
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data.message)
    }
  }
);
