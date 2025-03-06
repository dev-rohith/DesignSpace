import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";
import {
  addPrevMessages,
  setMessages,
} from "../slices/chatSlice";

export const getRooms = createAsyncThunk(
  "chat/createAsyncThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chat/rooms");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
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
        dispatch(addPrevMessages(response.data));
      }
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatRoomId, data }, { rejectWithValue }) => {
    try {
      console.log('etsing')
      const response = await axiosInstance.post(
        `/chat/rooms/${chatRoomId}/messages`,
        data
      );
      'hey this is one'
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
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);  

