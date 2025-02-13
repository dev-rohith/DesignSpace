import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../apis/axiosIntance";

export const onPayment = createAsyncThunk(
  "payment/onPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("payment/create-subcription", {
        plan: data,
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
