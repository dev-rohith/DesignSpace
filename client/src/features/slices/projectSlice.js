import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        project: null,
        isLoading: false,
    },
    reducers: {},
});

export default projectSlice;
