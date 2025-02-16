import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserStatus,
  deleteNonePendingApplication,
  getNonePendingApplications,
  getPendingApplications,
  getUsers,
} from "../actions/adminactions";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: null,
    applications: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //users management logic
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changeUserStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.data = state.users.data.map((user) =>
        user._id === action.payload.user._id ? action.payload.user : user
      );
    });

    //pending applications
    builder.addCase(getPendingApplications.fulfilled, (state, action) => {
      state.applications = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPendingApplications.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPendingApplications.rejected, (state, action) => {
      state.isLoading = false;
    });

    //non pending applications
    builder.addCase(getNonePendingApplications.fulfilled, (state, action) => {
      state.applications = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getNonePendingApplications.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getNonePendingApplications.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteNonePendingApplication.fulfilled, (state, action) => {
      state.applications.data = state.applications.data.filter(
        (application) => application._id !== action.payload.application._id
      );
    });
  },
});

export default adminSlice.reducer;
