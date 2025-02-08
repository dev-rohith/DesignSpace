import { createSlice } from "@reduxjs/toolkit";
import { signup, refreshToken, login, logoutDevice } from "./authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    otpSnded: false,
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    deviceLimitError: false,
    devices: [],
  },
  reducers: {
    setDeviceLimitError: (state, action) => {
      state.deviceLimitError = true;
      state.devices = action.payload;
    },
  },
  extraReducers: (builder) => {
    //signup logic here
    builder.addCase(signup.fulfilled, (state, action) => {

    }),
      builder.addCase(signup.pending, (state, action) => {
        state.status = "loading";
      }),
      builder.addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),

      /////refresh logic here
      builder.addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      }),
      builder.addCase(refreshToken.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });

    ///login logic here
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.isLoggedIn = true
      state.error = null
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // dealing with device limit
    builder.addCase(logoutDevice.fulfilled, (state, action) => {
      state.devices = [];
      state.deviceLimitError = false;
      state.error = null;
    });
    builder.addCase(logoutDevice.rejected, (state, action) => {
      console.log(action.payload)
      state.error = action.payload;
    });
  },
});

export const { setDeviceLimitError } = authSlice.actions;

export default authSlice.reducer;
