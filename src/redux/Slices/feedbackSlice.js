import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async () => {
    const response = await axiosInstance.get('/feedback');
    return response.data;
  }
);

export const fetchFeedbackDetails = createAsyncThunk(
  "feedback/fetchFeedbackDetails",
  async (id) => {
    const response = await axiosInstance.get(`/feedback/${id}`);
    return response.data;
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    currentFeedback: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentFeedback: (state) => {
      state.currentFeedback = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all feedbacks
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload.data;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch feedback details
      .addCase(fetchFeedbackDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFeedback = action.payload;
      })
      .addCase(fetchFeedbackDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer; 