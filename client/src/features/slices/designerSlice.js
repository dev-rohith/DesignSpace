import { createSlice } from "@reduxjs/toolkit";
import {
  addPortfolioItem,
  createProfileDesigner,
  deletePortfolioItem,
  editPortfolioItem,
  getMyPortfolio,
  getMyProfileDesigner,
  updateProfileDesigner,
} from "../actions/designerActions";

const designerSlice = createSlice({
  name: "designer",
  initialState: {
    profile: null,
    profileErrors: null,
    isProfileUpdating: false,
    isProfileEmpty: false,
    portfolio: null,
    isPortfolioUpdating: false,
    projects: [],
    tasks: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyProfileDesigner.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMyProfileDesigner.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMyProfileDesigner.rejected, (state, action) => {
      if (action.payload === "noProfile") {
        state.profile = [];
        state.isProfileEmpty = true;
        state.isLoading = false;
      }
      state.isLoading = false;
    });

    builder.addCase(createProfileDesigner.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.profileErrors = null;
      state.isProfileEmpty = false;
      state.isProfileUpdating = false;
    });
    builder.addCase(createProfileDesigner.pending, (state, action) => {
      state.isProfileUpdating = true;
    });
    builder.addCase(createProfileDesigner.rejected, (state, action) => {
      state.profileErrors = action.payload.errors;
      state.isProfileUpdating = false;
    });

    builder.addCase(updateProfileDesigner.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.isProfileUpdating = false;
    });
    builder.addCase(updateProfileDesigner.pending, (state, action) => {
      state.isProfileUpdating = true;
    });
    builder.addCase(updateProfileDesigner.rejected, (state, action) => {
      state.isProfileUpdating = false;
    });

    //portfolio logic here

    builder.addCase(getMyPortfolio.fulfilled, (state, action) => {
      state.portfolio = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMyPortfolio.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMyPortfolio.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deletePortfolioItem.fulfilled, (state, action) => {
      state.portfolio = state.portfolio.filter(
        (item) => item._id !== action.payload.data._id
      );
      state.isPortfolioUpdating = false;
    });
    builder.addCase(deletePortfolioItem.pending, (state, action) => {
      state.isPortfolioUpdating = true;
    });
    builder.addCase(deletePortfolioItem.rejected, (state, action) => {
      state.isPortfolioUpdating = false;
    });

    builder.addCase(addPortfolioItem.fulfilled, (state, action) => {
      state.portfolio.push(action.payload.data);
      state.isPortfolioUpdating = false;
    });
    builder.addCase(addPortfolioItem.pending, (state, action) => {
      state.isPortfolioUpdating = true;
    });
    builder.addCase(addPortfolioItem.rejected, (state, action) => {
      state.isPortfolioUpdating = false;
    });

    builder.addCase(editPortfolioItem.fulfilled, (state, action) => {
      console.log(action.payload);
      state.portfolio = state.portfolio.map((item) => {
        if (item._id === action.payload.currentId) {
          return action.payload.data;
        } else {
          return item;
        }
      });
      state.isPortfolioUpdating = false;
    });
    builder.addCase(editPortfolioItem.pending, (state, action) => {
      state.isPortfolioUpdating = true;
    });
    builder.addCase(editPortfolioItem.rejected, (state, action) => {
      state.isPortfolioUpdating = false;
    });
  },
});

export default designerSlice.reducer;
