import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js"
import landingReducer from "../features/landingSlice.js"
import applicationReducer from '../features/applicationSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    landing: landingReducer,
    application: applicationReducer
  },
});


export default store