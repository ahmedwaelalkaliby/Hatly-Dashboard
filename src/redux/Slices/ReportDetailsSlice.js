import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const getReportDetails = createAsyncThunk(
  "reportDetails/getReportDetails",  
  async (id) => {
    const response = await axiosInstance?.get(`/report/shipment/${id}`);
    console.log("report details response", response);
    // Extract the report object from the response
    return response?.data?.report ?? null;
  }
);

const updateReportStatus = createAsyncThunk(
  "reportDetails/updateReportStatus",
  async ({ id, status  }, { rejectWithValue }) => {
    console.log("update report status id", id);
    console.log("update report status status", status);
    try {
      const response = await axiosInstance?.patch(`/report/shipment/${id}?status=${status}`);
      console.log("update report status response", response);
      return response?.data ?? null;
    } catch (error) {
      console.log("update report status error", error);
      return rejectWithValue(error.response?.data?.message ?? "An error occurred");
    }
  }
);
const getChangeLog = createAsyncThunk(
  "reportDetails/getChangeLog",
  async (id) => {
    console.log("change log id", id);
    const response = await axiosInstance?.get(`/shipment/${id}/changelog`);
    console.log("change log response", response);
    return response?.data ?? null;
  }
);
const getShipmentChangeLog = createAsyncThunk(
  "reportDetails/getShipmentChangeLog",
  async (id) => {
    const response = await axiosInstance?.get(`/shipment/${id}/changelogs`);
    console.log("shipment change log responsesssssssss", response.data);
    return response?.data ?? null;
  }
);
const updateChangeLogStatus = createAsyncThunk(
  "reportDetails/updateChangeLogStatus",
  async ({ id, status }, { rejectWithValue }) => {  
    try {
      const response = await axiosInstance?.patch(`/shipment/${id}/changelog?status=${status}`);
      console.log("update change log status response", response);
      return response?.data ?? null;
    } catch (error) {
      console.log("update change log status error", error);
      return rejectWithValue(error.response?.data?.message ?? "An error occurred");
    }
  }
);
const reportDetailsSlice = createSlice({
  name: "reportDetails",  
  initialState: {
    reportDetails: null, 
    reportDetailsLoading: false,
    reportDetailsError: null,
    success: false,
    updateReportStatusSuccess: false,
    changeLogs: [],
    changeLogsLoading: false,
    changeLogsError: null,
    changeLogDetails: null,
    changeLogDetailsLoading: false,
    changeLogDetailsError: null,
    updateChangeLogStatusSuccess: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReportDetails.pending, (state) => {
        state.reportDetailsLoading = true;
        state.reportDetailsError = null;
        state.success = false;
      })
      .addCase(getReportDetails.fulfilled, (state, action) => {
        state.reportDetailsLoading = false;
        state.reportDetails = action.payload;
        state.success = true;
      })
      .addCase(getReportDetails.rejected, (state, action) => {
        state.reportDetailsLoading = false;
        state.reportDetailsError = action.error.message;
        state.success = false;
      })
      .addCase(updateReportStatus.pending, (state) => {
        state.reportDetailsLoading = true;
        state.reportDetailsError = null;
        state.updateReportStatusSuccess = false;
      }).addCase(updateReportStatus.fulfilled, (state, action) => {
        state.reportDetailsLoading = false;
        state.updateReportStatusSuccess = true;
      }).addCase(updateReportStatus.rejected, (state, action) => {
        state.reportDetailsLoading = false;
        state.reportDetailsError = action.error.message;
        state.updateReportStatusSuccess = false;
      }) .addCase(getShipmentChangeLog.pending, (state) => {
        state.changeLogsLoading = true;
        state.changeLogsError = null;
      }).addCase(getShipmentChangeLog.fulfilled, (state, action) => {
        state.changeLogsLoading = false;
        state.changeLogs = action.payload?.changelogs;
      }).addCase(getShipmentChangeLog.rejected, (state, action) => {
        state.changeLogsLoading = false;
        state.changeLogsError = action.error.message;
      }).addCase(getChangeLog.pending, (state) => {
        state.changeLogDetailsLoading = true;
        state.changeLogDetailsError = null;
      }).addCase(getChangeLog.fulfilled, (state, action) => {
        state.changeLogDetailsLoading = false;
        state.changeLogDetails = action.payload?.changelog;
      }).addCase(getChangeLog.rejected, (state, action) => {
        state.changeLogDetailsLoading = false;
        state.changeLogDetailsError = action.error.message;
      }).addCase(updateChangeLogStatus.pending, (state) => {
        state.updateChangeLogStatusSuccess = false;
        state.changeLogDetailsLoading = true;
      }).addCase(updateChangeLogStatus.fulfilled, (state, action) => {
        state.updateChangeLogStatusSuccess = true;
        state.changeLogDetailsLoading = false;
      }).addCase(updateChangeLogStatus.rejected, (state, action) => {
        state.updateChangeLogStatusSuccess = false;
        state.changeLogDetailsLoading = false;
      });
  },
});

export { getReportDetails, updateReportStatus, getChangeLog, getShipmentChangeLog, updateChangeLogStatus };
export default reportDetailsSlice.reducer;