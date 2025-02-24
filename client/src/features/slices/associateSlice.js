import { createSlice } from "@reduxjs/toolkit";
import { createMyProfileAssociate, getMyProfileAssociate, updateMyProfileAssociate } from "../actions/associateActions";

const associateSlice = createSlice({
  name: "associate",
  initialState: {
    profile: null,
    isProfileUpdating: false,
    profileErrors: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
        //get profile logic
    builder.addCase(getMyProfileAssociate.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getMyProfileAssociate.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getMyProfileAssociate.rejected, (state, action) => {
      if (action.payload === "noProfile") {
        state.profile = [];
        state.isProfileEmpty = true;
        state.isLoading = false;
      }
      state.isLoading = false;
    })
         //creation logic
    builder.addCase(createMyProfileAssociate.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.profileErrors = null;
      state.isProfileEmpty = false;
      state.isProfileUpdating = false;
    })
    builder.addCase(createMyProfileAssociate.pending, (state, action) => {
      state.isProfileUpdating = true
    })
    builder.addCase(createMyProfileAssociate.rejected, (state, action) => {
      state.profileErrors = action.payload.errors;
      state.isProfileUpdating = false;
    })
          //updation logic
    builder.addCase(updateMyProfileAssociate.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.isProfileUpdating = false
    })
    builder.addCase(updateMyProfileAssociate.pending, (state, action) => {
      state.isProfileUpdating = true
    })
    builder.addCase(updateMyProfileAssociate.rejected, (state, action) => {
      state.isProfileUpdating = false
    })


  }
});

export default associateSlice.reducer;
