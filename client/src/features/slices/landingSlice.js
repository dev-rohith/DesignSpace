import { createSlice } from "@reduxjs/toolkit";
import {
  getLanding,
  getPortfolios,
  getSubscriptionsDetails,
} from "../actions/landingActions";
import { addCaroseulItem, addCustomerReviewItem, deleteCaroseulItem, deleteCustomerReviewItem } from "../actions/adminactions";

const landingSlice = createSlice({
  name: "landing",
  initialState: {
    carousel: [],
    isCarouselUpdating: false,
    customer_reviews: [],
    isReviewsUpdating: false,
    designers: [],
    designers_locations: [],
    isLoading: false,
    portfolios: [],
    subscriptions_prices: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanding.fulfilled, (state, action) => {
      state.carousel = action.payload.carousel;
      state.customer_reviews = action.payload.customer_reviews;
      state.designers = action.payload.designers;
      state.designers_locations = action.payload.designers_locations;
      state.isLoading = false;
    });
    builder.addCase(getLanding.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getLanding.rejected, (state, action) => {
      state.isLoading = false;
    });

    //adding carousel item actions

    builder.addCase(addCaroseulItem.fulfilled, (state, action) => {
      state.carousel.push(action.payload.data);
      state.isCarouselUpdating = false;
    });
    builder.addCase(addCaroseulItem.pending, (state, action) => {
      state.isCarouselUpdating = true;
    });
    builder.addCase(addCaroseulItem.rejected, (state, action) => {
      state.isCarouselUpdating = false;
    });

    //deleting carousel item actions

    builder.addCase(deleteCaroseulItem.fulfilled, (state, action) => {
      state.carousel = state.carousel.filter(
        (item) => item.public_id !== action.payload.data.public_id
      );
      state.isCarouselUpdating = false;
    });
    builder.addCase(deleteCaroseulItem.pending, (state, action) => {
      state.isCarouselUpdating = true;
    });
    builder.addCase(deleteCaroseulItem.rejected, (state, action) => {
      state.isCarouselUpdating = false;
    });

    //addingcustomer reviews logic
    builder.addCase(addCustomerReviewItem.fulfilled, (state, action) => {
      state.customer_reviews.push(action.payload.data);
      state.isReviewsUpdating = false;
    })
    builder.addCase(addCustomerReviewItem.pending, (state, action) => {
      state.isReviewsUpdating = true;
    });
    builder.addCase(addCustomerReviewItem.rejected, (state, action) => {
      state.isReviewsUpdating = false;
    });

    //deleting customer reviews logic
    builder.addCase(deleteCustomerReviewItem.fulfilled, (state, action) => {
      state.customer_reviews = state.customer_reviews.filter(
        (item) => item.video.public_id !== action.payload.data.video.public_id
      );
      state.isReviewsUpdating = false;
    });
    builder.addCase(deleteCustomerReviewItem.pending, (state, action) => {
      state.isReviewsUpdating = true;
    });
    builder.addCase(deleteCustomerReviewItem.rejected, (state, action) => {
      state.isReviewsUpdating = false;
    });

    //portifolios logic
    builder.addCase(getPortfolios.fulfilled, (state, action) => {
      state.portfolios = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPortfolios.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPortfolios.rejected, (state, action) => {
      state.isLoading = false;
    });

    //subscription prices  logic
    builder.addCase(getSubscriptionsDetails.fulfilled, (state, action) => {
      state.subscriptions_prices = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSubscriptionsDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSubscriptionsDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default landingSlice.reducer;
