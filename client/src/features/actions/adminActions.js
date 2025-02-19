import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue("their was an error while feching users");
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async ({ userId, action }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`user/${userId}`, {
        status: action,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPendingApplications = createAsyncThunk(
  "admin/getPendingApplications",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "their was an error while feching pending appications"
      );
    }
  }
);

export const changeApplicationStatus = createAsyncThunk(
  "admin/changeApplicationStatus",
  async ({ applicationId, action }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`application/${applicationId}`, {
        status: action,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNonePendingApplications = createAsyncThunk(
  "admin/getNonePendingApplications",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(
        "their was an error while feching pending appications"
      );
    }
  }
);

export const deleteNonePendingApplication = createAsyncThunk(
  "admin/deleteNonePendingApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `application/${applicationId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCaroseulItem = createAsyncThunk(
  "landing/carousel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("landing/carousel", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCaroseulItem = createAsyncThunk(
  "admin/deletecoroseulItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/landing/carousel/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCustomerReviewItem = createAsyncThunk(
  "admin/addCustomerReviewItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "landing/customer-review",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCustomerReviewItem = createAsyncThunk(
  "admin/deleteCustomerReviewItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/landing/customer-review/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTopDesingerItem = createAsyncThunk(
  "admin/addTopDesingerItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/landing/designer", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTopDesignerItem = createAsyncThunk(
  "admin/deleteTopDesignerItem",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(`/landing/desinger/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

//------------------------------------ not worked ones
