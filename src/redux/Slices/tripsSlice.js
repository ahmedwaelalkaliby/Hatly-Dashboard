import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchTrips = createAsyncThunk("trips/fetchTrips", async ({ 
  page, take, origin, destination, originCity, destinationCity, departDate, available, lessThanWight, moreThanWight, latest
 } = {}) => {
  const params = {};
  if (page) params.page = page;
  if (take) params.take = take;
  if (origin) params.origin = origin;
  if (destination) params.destination = destination;
  if (originCity) params.originCity = originCity;
  if (destinationCity) params.destinationCity = destinationCity;
  if (departDate) params.departDate = departDate;
  if (available) params.available = available;
  if (lessThanWight) params.lessThanWight = lessThanWight;
  if (moreThanWight) params.moreThanWight = moreThanWight;
  if (latest) params.latest = latest;
  const response = await axiosInstance.get("/trip", { params });
  return response.data;
});

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    trips: [],
    loading: false,
    error: null,
    totalData: 0,
    totalPages: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload.trips;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export { fetchTrips };
export default tripsSlice.reducer;
