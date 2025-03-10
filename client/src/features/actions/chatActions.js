import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";
import {
  addPrevMessages,
  setMessages,
} from "../slices/chatSlice";

export const getRooms = createAsyncThunk(
  "chat/createAsyncThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chat/rooms");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMessages = createAsyncThunk(

  "chat/getMessages",
  async ({ chatRoomId, page }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/chat/rooms/${chatRoomId}/messages?page=${page}`
      );
      if (page === 1) {  
        dispatch(setMessages(response.data));
      } else {
        dispatch(addPrevMessages(response.data));  //if throttle happens this will be called with new page number
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatRoomId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/chat/rooms/${chatRoomId}/messages`,
        data
      );
      return response.data;
    } catch (error) {
      console.log('hey this is two');
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const createChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/chat/rooms", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);  

