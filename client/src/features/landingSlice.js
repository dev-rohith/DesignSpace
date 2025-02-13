import { createSlice } from "@reduxjs/toolkit";
import { getLanding, getPortfolios, getSubscriptionsDetails } from "./landingApi";

const landingSlice = createSlice({
  name: "landing",
  initialState: {
    carousel: [],
    customer_reviews: [],
    designers: [],
    designers_locations: [],
    isLoading: false,
    isError: false,
    portfolios: [],
    subscriptions_prices: null
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
      state.isError = true;
      state.isLoading = false;
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
    builder.addCase(getSubscriptionsDetails.fulfilled, (state, action)=>{
      state.subscriptions_prices = action.payload
      state.isLoading = false
    })
    builder.addCase(getSubscriptionsDetails.pending, (state,action)=>{
      state.isLoading = true
    })
    builder.addCase(getSubscriptionsDetails.rejected, (state,action)=>{
      state.isLoading = false
    })

    
  },
});

export default landingSlice.reducer;
