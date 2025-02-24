import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosIntance";
import { setIsLoading, setIsUpdatingTask } from "../slices/taskSlice";

export const createTask = createAsyncThunk(
  "task/createTask",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsUpdatingTask(true));
    try {
      const response = await axiosInstance.post(`/tasks`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setIsUpdatingTask(false));
    }
  }
);

export const updateTask = createAsyncThunk("task/updateTask", async (data) => {
  try {
    dispatch(setIsUpdatingTask(true));
    const response = await axiosInstance.put(
      `/tasks/${data.id}`,
      data.formData
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  } finally {
    dispatch(setIsUpdatingTask(false));
  }
});

export const getDesignerPendingTasks = createAsyncThunk(
  "task/getDesignerPendingTasks",
  async (url, {dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const getDesignerInProgressTasks = createAsyncThunk(
  "task/getDesignerInprogressTasks",
  async (url, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const getDesignerCompletedTasks = createAsyncThunk(
  "task/getDesignerCompletedTasks",
  async (url, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const getLiveTasks = createAsyncThunk(
  "task/getLiveTasks",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get('/tasks/live');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setIsLoading(false));
    }
  });

export const getTaskDetailsDesigner = createAsyncThunk(
  "/task/getTaskDetails",
  async (id) => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getTaskDetailsAssocaite = createAsyncThunk(
  "/task/getTaskDetailsAssocaite",
  async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/tasks/associate/details/${id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }finally{
      setIsLoading(false)
    }
  }
);

export const acceptTaskAssociate = createAsyncThunk(
  "/task/acceptTaskAssociate",
  async (id) => {
    setIsUpdatingTask(true);
    try {
      const response = await axiosInstance.put(`/tasks/accept/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }finally{
      setIsUpdatingTask(false) 
    }
  })


  export const getAssocaiteTasks = createAsyncThunk(
    "task/getRunningTasks",
    async (url, { dispatch, rejectWithValue }) => {
      dispatch(setIsLoading(true));
      try {
        const response = await axiosInstance.get(url);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  );

export const getAssociateTask = createAsyncThunk(
  "task/getAssociateTask",
  async (id, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(`/tasks/associate/mytask/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setIsLoading(false));    
    }
  }
);