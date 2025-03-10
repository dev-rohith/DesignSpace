import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const getProjectDetails = createAsyncThunk(
  "designer/getProjectDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePedingProject = createAsyncThunk(
  "designer/deletePedingProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProjectDetails = createAsyncThunk(
  "designer/updateProjectDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/projects/${data.id}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProjectProgress = createAsyncThunk(
  "designer/updateProjectProgress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/projects/progress/${data.id}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptProjectByClient = createAsyncThunk(
  "designer/acceptProjectByClient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`projects/accept/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sentProjectToReview = createAsyncThunk(
  "designer/sentProjectToReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/projects/${id}/sent-review`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBeforeProjectToPortfolio = createAsyncThunk(
  "designer/addBeforeProjectToPortfolio",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axiosInstance.put(
        `/projects/before/${data._id}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBeforeProjectToPortifolio = createAsyncThunk(
  "designer/deleteBeforeProjectToPortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/projects/before/${data.projectId}/item/${data.itemId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAfterProjectToPortfolio = createAsyncThunk(
  "designer/afterProjectToPortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/projects/after/${data._id}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAfterProjectToPortifolio = createAsyncThunk(
  "designer/deleteAfterProjectToPortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/projects/after/${data.projectId}/item/${data.itemId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeTheProject = createAsyncThunk(
  "designer/completeTheProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/projects/${id}/complete`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reviewProject = createAsyncThunk(
  "designer/reviewProject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `projects/review/${data.id}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
