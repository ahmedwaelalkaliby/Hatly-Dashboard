import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchShipments = createAsyncThunk("shipment/fetchShipments", async ({ 
  page, take, from, to, fromCity, toCity, lessThanReward, moreThanReward, beforeExpectedDate, afterExpectedDate, weight, latest
} = {}) => {
  const params = {};
  if (page) params.page = page;
  if (take) params.take = take;
  if (from) params.from = from;
  if (to) params.to = to;
  if (fromCity) params.fromCity = fromCity;
  if (toCity) params.toCity = toCity;
  if (lessThanReward) params.lessThanReward = lessThanReward;
  if (moreThanReward) params.moreThanReward = moreThanReward;
  if (beforeExpectedDate) params.beforeExpectedDate = beforeExpectedDate;
  if (afterExpectedDate) params.afterExpectedDate = afterExpectedDate;
  if (weight) params.weight = weight;
  if (latest) params.latest = latest;
  const response = await axiosInstance.get("/shipment", { params });
  return response.data;
});

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: {
    shipments: [],
    loading: false,
    error: null,
    totalData: 0,
    totalPages: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload.shipments;
        state.totalData = action.payload.totalData;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default shipmentSlice.reducer;
export { fetchShipments };
export const { setFilteredShipments } = shipmentSlice.actions;
