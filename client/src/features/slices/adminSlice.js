import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserStatus,
  deleteNonePendingApplication,
  getAdminAnalytics,
  getNonePendingApplications,
  getPendingApplications,
  getUsers,
} from "../actions/adminActions";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: null,
    applications: null,
    analytics: null,
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
    //analytics logic
    builder.addCase(getAdminAnalytics.fulfilled, (state, action) => {
      state.analytics = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAdminAnalytics.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAdminAnalytics.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default adminSlice.reducer;
