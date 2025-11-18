import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

// Async thunk for fetching all supports
export const fetchSupports = createAsyncThunk("support/fetchSupports",
    async ({ page, take }, { rejectWithValue }) => {
        const params = {}
        if (page) params.page = page;
        if (take) params.take = take;
        try {
            const response = await axiosInstance.get("/deal/support/all", { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch supports");
        }
    }
);

// Async thunk for fetching support details
export const fetchSupportDetails = createAsyncThunk("support/fetchSupportDetails",
    async (supportId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/deal/support/details/${supportId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch support details");
        }
    }
);

// Async thunk for updating support status
export const updateSupportStatus = createAsyncThunk(
    "support/updateStatus",
    async ({ supportId, status, adminResponse }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/deal/support/${supportId}/status`, null, {
                params: { status, adminResponse }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update support status");
        }
    }
);

// Async thunk for completing a deal
export const completeDeal = createAsyncThunk(
    "support/completeDeal",
    async (dealId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/deal/admin/complete/${dealId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to complete deal");
        }
    }
);

// Async thunk for refunding a deal
export const refundDeal = createAsyncThunk(
    "support/refundDeal",
    async (dealId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/payment/refund/deal/${dealId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to refund deal");
        }
    }
);

const initialState = {
    supports: [],
    currentSupport: null,
    loading: false,
    error: null,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 5,
    updateStatusLoading: false,
    updateStatusError: null,
    completeDealLoading: false,
    completeDealError: null,
    refundDealLoading: false,
    refundDealError: null,
};

const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload;
        },
        clearCurrentSupport: (state) => {
            state.currentSupport = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchSupports
            .addCase(fetchSupports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSupports.fulfilled, (state, action) => {
                state.loading = false;
                state.supports = action.payload.data;
                state.totalItems = action.payload.meta.total;
                state.error = null;
            })
            .addCase(fetchSupports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Handle fetchSupportDetails
            .addCase(fetchSupportDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSupportDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSupport = action.payload.support;
                state.error = null;
            })
            .addCase(fetchSupportDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Something went wrong";
            })

            // Handle updateSupportStatus
            .addCase(updateSupportStatus.pending, (state) => {
                state.updateStatusLoading = true;
                state.updateStatusError = null;
            })
            .addCase(updateSupportStatus.fulfilled, (state, action) => {
                state.updateStatusLoading = false;
                state.currentSupport = {
                    ...state.currentSupport,
                    status: action.payload.status,
                    adminResponse: action.payload.adminResponse
                };
                state.updateStatusError = null;
            })
            .addCase(updateSupportStatus.rejected, (state, action) => {
                state.updateStatusLoading = false;
                state.updateStatusError = action.payload.message || "Something went wrong";
            })

            // Handle completeDeal
            .addCase(completeDeal.pending, (state) => {
                state.completeDealLoading = true;
                state.completeDealError = null;
            })
            .addCase(completeDeal.fulfilled, (state, action) => {
                state.completeDealLoading = false;
                state.completeDealError = null;
                // Update deal status in current support
                if (state.currentSupport) {
                    state.currentSupport.deal = {
                        ...state.currentSupport.deal,
                        dealStatus: 'completed'
                    };
                }
            })
            .addCase(completeDeal.rejected, (state, action) => {
                state.completeDealLoading = false;
                state.completeDealError = action.payload?.message || "Failed to complete deal";
            })
            
            // Handle refundDeal
            .addCase(refundDeal.pending, (state) => {
                state.refundDealLoading = true;
                state.refundDealError = null;
            })
            .addCase(refundDeal.fulfilled, (state, action) => {
                state.refundDealLoading = false;
                state.refundDealError = null;
                // Update deal status in current support
                // if (state.currentSupport) {
                //     state.currentSupport.deal = {
                //         ...state.currentSupport.deal,
                //         dealStatus: 'refunded'
                //     };
                // }
            })
            .addCase(refundDeal.rejected, (state, action) => {
                state.refundDealLoading = false;
                state.refundDealError = action.payload?.message || "Failed to refund deal";
            });
    },
});

export const { setCurrentPage, setItemsPerPage, clearCurrentSupport } = supportSlice.actions;
export default supportSlice.reducer;