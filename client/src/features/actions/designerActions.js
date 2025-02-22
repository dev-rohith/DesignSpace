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
      console.log(response.data);
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

export const addPortfolioItem = createAsyncThunk(
  "designer/addPortfolioItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/designer/portfolio", data);
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
      const response = await axiosInstance.put(
        `/designer/portfolio/${data.id}`,
        data.formData
      );
      response.data.currentId = data.id;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//this are the actions for the projects

export const getDesignerPendingProjects = createAsyncThunk(
  "designer/getDesignerPendingProjects",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDesignerInProgressProjects = createAsyncThunk(
  "designer/getDesignerInProgressProjects",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDesignerInReviewProjects = createAsyncThunk(
  "designer/getDesignerInReviewProjects",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDesignerCompletedProjects = createAsyncThunk(
  "designer/getDesignerCompletedProjects",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
