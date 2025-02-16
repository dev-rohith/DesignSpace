import { createSlice } from "@reduxjs/toolkit";
import { requestRoleAssociate, requestRoleDesigner } from "../actions/applicationActions";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
    isLoading: false, //this is for the
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestRoleDesigner.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(requestRoleDesigner.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(requestRoleDesigner.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(requestRoleAssociate.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(requestRoleAssociate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(requestRoleAssociate.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default applicationSlice.reducer;
