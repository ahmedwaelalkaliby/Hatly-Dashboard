import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const initialState = {
  trip: {},
  user: {},
  deals: [],
  status: "idle",
  error: null,
};

export const fetchTripDetails = createAsyncThunk(
  "tripDetails/fetchTripDetails",
  async (tripId, { rejectWithValue }) => {
    try {
      const tripResponse = await axiosInstance.get(`/trip/${tripId}`);

      if (tripResponse.data.status === false) {
        return rejectWithValue(tripResponse.data.message);
      }

      // Get user data using userId from trip response
      const userResponse = await axiosInstance.get(
        `/user/${tripResponse.data.trip.userId}`
      );

      // Get deals data for the trip
      const dealsResponse = await axiosInstance.get(`/trip/${tripId}/deals`);

      return {
        trip: tripResponse.data.trip,
        user: userResponse.data.user,
        deals: dealsResponse.data.deals || [],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch trip details"
      );
    }
  }
);

export const useVerifyTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripId) => {
      const response = await axiosInstance.patch(`/trip/${tripId}/verify`);
      return response.data.trip;
    },
      onSuccess: (error, variables) => {
        // Invalidate and refetch the trip details after verification
        queryClient.invalidateQueries(["tripDetails", variables.tripId]);
        console.log('Verification successful:', error);
      },
      onError: (error) => {
        console.error('Verification failed:', error);
      },
    }
  );
};

const tripDetailsSlice = createSlice({
  name: "tripDetails",
  initialState: initialState,
  reducers: {
    resetTripDetails: (state) => {
      state.trip = {};
      state.user = {};
      state.deals = [];
      state.status = "idle";
      state.error = null;
    },
    updateTripVerification: (state, action) => {
      state.trip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTripDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trip = action.payload.trip;
        state.user = action.payload.user;
        state.deals = action.payload.deals;
        state.error = null;
        console.log(action.payload)
      })
      .addCase(fetchTripDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.trip = {};
        state.user = {};
        state.deals = [];
      });
  },
});

export const { resetTripDetails, updateTripVerification } = tripDetailsSlice.actions;
export default tripDetailsSlice.reducer;
