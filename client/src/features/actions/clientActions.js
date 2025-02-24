import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const getClientPendingProjects = createAsyncThunk(
    "client/getClientPendingProjects",
    async (url, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(url);
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getClientInprogressProjects = createAsyncThunk(
    "client/getClientInprogressProjects",
    async (url, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(url);
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
); 

export const getClientInReviewProjects = createAsyncThunk(
    "client/getClientInReviewProjects",
    async (url, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(url);
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);  


export const getClientCompletedProjects = createAsyncThunk(
    "client/getClientCompletedProjects",
    async (url, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(url);
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);  
