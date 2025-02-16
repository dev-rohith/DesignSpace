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


//------------------------------------ not worked ones

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

export const addcoroseulItem = createAsyncThunk(
  "admin/addcoroseulItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("coroseul", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const deletecoroseulItem = createAsyncThunk(
  "admin/deletecoroseulItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`coroseul/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);