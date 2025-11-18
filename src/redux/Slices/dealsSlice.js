import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async ({ page, take, to, from, travelerEmail, shopperEmail } = {}) => {
    const params = {};
    if (page) params.page = page;
    if (take) params.take = take;
    if (to) params.to = to;
    if (from) params.from = from;
    if (travelerEmail) params.travelerEmail = travelerEmail;
    if (shopperEmail) params.shopperEmail = shopperEmail;
    const response = await axiosInstance.get(`/deal`, { params });
    return response.data;
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    deals: [],
    filteredDeals: [],
    loading: false,
    error: null,
    totalPages: 0,
    totalData: 0,
    filteredDeals: [],
  },
  reducers: {
    setFilteredDeals: (state, action) => {
      state.filteredDeals = action.payload.deals;
    },
  },
  reducers: {
    setFilteredDeals: (state, action) => {
      state.filteredDeals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload.deals;
        state.filteredDeals = action.payload.deals;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.filteredDeals = action.payload.deals;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchDeals };
export const { setFilteredDeals } = dealsSlice.actions;
export default dealsSlice.reducer;
