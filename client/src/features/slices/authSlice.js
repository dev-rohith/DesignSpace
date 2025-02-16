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
  logoutAll,
} from "../actions/authActions";
import { updateUser, updateUserPic } from "../actions/userActions";

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

    //user logout fucntionality
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    });

    //get user account logic
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action);
      state.user.firstName = action.payload.data.firstName;
      state.user.lastName = action.payload.data.lastName;
    });

    builder.addCase(updateUserPic.fulfilled, (state, action) => {
      state.user.profilePicture = action.payload.new_pic;
    });

    //user logout from all logic
    builder.addCase(logoutAll.fulfilled, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    });
  },
});

export const { setDeviceLimitError } = authSlice.actions;

export default authSlice.reducer;
