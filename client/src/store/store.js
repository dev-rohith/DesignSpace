import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice.js";
import landingReducer from "../features/slices/landingSlice.js";
import applicationReducer from "../features/slices/applicationSlice.js";
import adminReducer from "../features/slices/adminSlice.js";
import designerReducer from "../features/slices/designerSlice.js";
import associateReducer from "../features/slices/associateSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    landing: landingReducer,
    application: applicationReducer,
    admin: adminReducer,
    designer: designerReducer,
    associate: associateReducer,
  },
});

export default store;
