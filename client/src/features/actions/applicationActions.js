import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const requestRoleDesigner = createAsyncThunk(
  "application/createDesignerApplication",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/application", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const requestRoleAssociate = createAsyncThunk(
  "application/createAssociateApplication",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/application", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
