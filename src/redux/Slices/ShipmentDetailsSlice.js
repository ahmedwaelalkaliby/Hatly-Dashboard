import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const initialState = {
    shipment: {},
    user: {},
    deals: [],
    status: 'idle',
    error: null
}

export const fetchShipmentDetails = createAsyncThunk('shipmentDetails/fetchShipmentDetails', async (shipmentId, { rejectWithValue }) => {
    try {
        const shipmentResponse = await axiosInstance.get(`/shipment/${shipmentId}`);
        
        if (shipmentResponse.data.status === false) {
            return rejectWithValue(shipmentResponse.data.message);
        }

        // Get user data using userId from shipment response
        const userResponse = await axiosInstance.get(`/user/${shipmentResponse.data.shipment.userId}`);
        
        // Get deals data for the shipment
        const dealsResponse = await axiosInstance.get(`/shipment/${shipmentId}/deals`);
        
        return {
            shipment: shipmentResponse.data.shipment,
            user: userResponse.data.user,
            deals: dealsResponse.data.deals || []
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch shipment details');
    }
});

const shipmentDetailsSlice = createSlice({
    name: "shipmentDetails",
    initialState: initialState,
    reducers: {
        resetShipmentDetails: (state) => {
            state.shipment = {};
            state.user = {};
            state.deals = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShipmentDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchShipmentDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.shipment = action.payload.shipment;
                state.user = action.payload.user;
                state.deals = action.payload.deals;
                state.error = null;
            })
            .addCase(fetchShipmentDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.shipment = {};
                state.user = {};
                state.deals = [];
            });
    },
});

export const { resetShipmentDetails } = shipmentDetailsSlice.actions;
export default shipmentDetailsSlice.reducer;


