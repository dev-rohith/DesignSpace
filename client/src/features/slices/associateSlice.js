import { createSlice } from "@reduxjs/toolkit";

const associateSlice = createSlice({
  name: "associate",
  initialState: {
    profile: null,
    tasks: [],
    isLoading: false,
  },
  reducers: {},
});

export default associateSlice;
