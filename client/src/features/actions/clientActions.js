import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";

export const getClientPendingProjects = createAsyncThunk(
    "client/getClientPendingProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("projects/client/pending");
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getClientInprogressProjects = createAsyncThunk(
    "client/getClientInprogressProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("projects/client/inprogress");
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
); 

export const getClientInReviewProjects = createAsyncThunk(
    "client/getClientInReviewProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("projects/client/inreview");
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);  


export const getClientCompletedProjects = createAsyncThunk(
    "client/getClientCompletedProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("projects/client/completed");
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);  
