import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  refreshToken,
  login,
  logoutDevice,
  verifyOtp,
  resendOtp,
  getUser,
  logout,
} from "./authApi";
import { updateUser } from "./userApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    verifyId: null,
    user: null,
    isLoggedIn: false,
    onPageLoad: true,
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
      state.verifyId = action.payload.verifyId;
      state.isLoading = false;
    }),
    builder.addCase(signup.pending, (state, action) => {
        state.isLoading = true;
      }),
    builder.addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }),

      //otp verifycation here
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyId = null;
        state.isLoading = false;
      });

    builder.addCase(verifyOtp.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    //resend otp
    builder.addCase(resendOtp.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(resendOtp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resendOtp.rejected, (state, action) => {
      state.isLoading = false;
    });

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
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
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
      state.error = action.payload;
    });

    //get user account logic
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.onPageLoad = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.onPageLoad = false;
    });

    builder.addCase(logout.fulfilled, (state, action)=>{
      state.user = null
      state.isLoggedIn = false
    })
    builder.addCase(logout.rejected, (state, action)=>{
      state.user = null
      state.isLoggedIn = false
    })

    builder.addCase(updateUser.fulfilled,(state,action)=>{
      state.user.firstName = action.firstName
      state.user.lastName = action.lastName
    })
    
  },
});

export const { setDeviceLimitError } = authSlice.actions;

export default authSlice.reducer;
