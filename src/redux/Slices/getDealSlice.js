import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const getDealDetails = createAsyncThunk(
    "getDeal/getDealDetails",
    async (dealId) => {
        console.log(dealId, "dealId");
        const response = await axiosInstance?.get(`/deal/${dealId}`);
        console.log(response.data.deal, "response.data");
        return response.data.deal;
    }
);

const getDealSlice = createSlice({
    name: "getDeal",
    initialState: {
        deal: {},
        dealLoading: false,
        dealError: null,
        success: false
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getDealDetails.pending, (state) => {
            state.dealLoading = true;
            state.dealError = null;
            state.success = false;
        })
        .addCase(getDealDetails.fulfilled, (state, action) => {
            state.dealLoading = false;
            state.deal = action.payload;
            state.success = true;
        })
        .addCase(getDealDetails.rejected, (state, action) => {
            state.dealLoading = false;
            state.dealError = action.error.message;
            state.success = false;
        });
    } 
});

export { getDealDetails };
export default getDealSlice.reducer;