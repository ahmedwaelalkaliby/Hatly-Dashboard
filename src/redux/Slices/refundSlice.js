import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const getAllRefunds = createAsyncThunk("refund/getAllRefunds", async (startingAfter) => {
    try {
        const response = await axiosInstance.get(`/payment/refunds?limit=5${startingAfter ? `&startingAfter=${startingAfter}` : ''}`);
        return response.data;
    } catch (error) {
        console.log(error , "error");
        return error.response?.data;
    }
});

const refundSlice = createSlice({
    name: "refund",
    initialState: {
        refunds: [],
        loading: false,
        error: null,
        hasMore: true,
    },
    reducers: {
        setRefunds: (state, action) => {
            state.refunds = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRefunds.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllRefunds.fulfilled, (state, action) => {
            state.loading = false;
            state.refunds = action.payload.data;
            if(action.payload.data.length >= 5){
                state.hasMore = true;
            }else{
                state.hasMore = false;
            }
        })
        .addCase(getAllRefunds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export {getAllRefunds};
export const { setRefunds } = refundSlice.actions;
export default refundSlice.reducer;
