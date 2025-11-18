import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchReports = createAsyncThunk("reports/fetchReports", async ({
  page, take, createdAt, type, status
} = {}) => {
  const params = {};
  if (page) params.page = page;
  if (take) params.take = take;
  if (createdAt) params.createdAt = createdAt;
  if (type) params.type = type;
  if (status) params.status = status;
  const response = await axiosInstance.get("/report/shipment", { params });
  return response.data;
});

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    error: null,
    loading: false,
    totalData: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.reports;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchReports };
export default reportsSlice.reducer;
