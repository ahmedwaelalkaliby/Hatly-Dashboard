import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const getRefundDetails = createAsyncThunk('refundDetails/getRefundDetails', async (id) => {
    const response = await axiosInstance.get(`/payment/refunds/${id}`);
    console.log(response.data);
    return response.data;
})
const refundDetailsSlice = createSlice({
    name: 'refundDetails',
    initialState: {
        refundDetails: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRefundDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getRefundDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.refundDetails = action.payload;
        })
        builder.addCase(getRefundDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export default refundDetailsSlice.reducer;
export { getRefundDetails };
