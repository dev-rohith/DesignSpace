import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const getMyProfileDesigner = createAsyncThunk(
  "designer/getMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("designer/profile");
      return response.data;
    } catch (error) {
      if (error.status === 404) {
        return rejectWithValue("noProfile");
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getMyPortfolio = createAsyncThunk(
  "designer/getMyPortfolio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("designer/portfolio");
      console.log(response.data);
      return response.data.portfolio;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProfileDesigner = createAsyncThunk(
  "designer/createProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/designer/profile", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfileDesigner = createAsyncThunk(
  "designer/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/designer/profile", data);
      console.log(response.data)
      return response.data;
    } catch (error) {
     return rejectWithValue(error.response.data);
    }
  }
);

export const deletePortfolioItem = createAsyncThunk(
  "designer/deletePortfolioItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/designer/portfolio/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const editPortfolioItem = createAsyncThunk(
  "designer/editPortfolioItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/designer/portfolio/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);