import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const onPayment = createAsyncThunk(
  "payment/onPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("payment/subcription", {
        plan: data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
