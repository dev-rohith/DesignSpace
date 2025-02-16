import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const getLanding = createAsyncThunk(
  "landing/getLanding",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/landing");
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getPortfolios = createAsyncThunk(
  "landing/getOurWork",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("designer/portfolios");
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getSubscriptionsDetails = createAsyncThunk(
  "landing/getSubscriptionsDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "payment/get-subcription-prices"
      );
      return response.data.subscription;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
