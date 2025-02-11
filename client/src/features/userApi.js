import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../apis/axiosIntance";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/user/update", data);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const updateUserPic = createAsyncThunk('user/updateUserPic', async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/user/update-profile-pic", data);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  })