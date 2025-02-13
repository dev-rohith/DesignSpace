import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js"
import landingReducer from "../features/landingSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    landing: landingReducer
  },
});


export default store