import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/UsersSlice";
import tripsReducer from "./Slices/tripsSlice";
import dealsReducer from "./Slices/dealsSlice";
import shipmentsReducer from "./Slices/shipmentSlice";
import authReducer from "./Slices/authSlice";
import userDetailsReducer from "./Slices/UserDetailsSlice";
import getDealReducer from "./Slices/getDealSlice";
import shipmentDetailsReducer from "./Slices/ShipmentDetailsSlice";
import reportDetailsReducer from "./Slices/ReportDetailsSlice";
import reportsReducer from "./Slices/reportsSlice";
import tripDetailsReducer from "./Slices/TripDetailsSlice";
import supportReducer from "./Slices/supportSlice";
import refundReducer from "./Slices/refundSlice";
import refundDetailsReducer from "./Slices/refunDetalsSlice";
import feedbackReducer from "./Slices/feedbackSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    trips: tripsReducer,
    deals: dealsReducer,
    shipments: shipmentsReducer,
    auth: authReducer,
    userDetails: userDetailsReducer,
    getDeal: getDealReducer,
    shipmentDetails: shipmentDetailsReducer,
    reports: reportsReducer,
    tripDetails: tripDetailsReducer,
    reportDetails: reportDetailsReducer,
    support: supportReducer,
    refund: refundReducer,
    refundDetails: refundDetailsReducer,
    feedback: feedbackReducer,
  },
});
