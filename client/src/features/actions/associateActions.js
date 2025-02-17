import { createAsyncThunk } from "@reduxjs/toolkit";


export const getMyProfile = createAsyncThunk(
    "associate/getMyProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("associate/profile");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createMyProfile = createAsyncThunk(
    "associate/createMyProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("associate/profile");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateMyProfile = createAsyncThunk(
    "associate/updateMyProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("associate/profile");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);