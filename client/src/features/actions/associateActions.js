import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";


export const getMyProfileAssociate = createAsyncThunk(
    "associate/getMyProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("associate/profile");
            console.log(response.data)
            return response.data;
        } catch (error) {
            if (error.status === 404) {
                return rejectWithValue("noProfile");
              }
            return rejectWithValue(error.response.data);
        }
    }
);

export const createMyProfileAssociate = createAsyncThunk(
    "associate/createMyProfile",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("associate/profile",data);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateMyProfileAssociate = createAsyncThunk(
    "associate/updateMyProfile",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("associate/profile", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);