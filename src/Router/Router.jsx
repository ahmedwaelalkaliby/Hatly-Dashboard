import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import LandingPage from "../Pages/LandingPage/LandingPage";
import UserDetails from "../Pages/UserDetails/UserDetails";
import Home from "../Pages/Home/Home";
import Users from "../Pages/Users/users";
import Trips from "../Pages/Trips/Trips";
import Shipments from "../Pages/Shipments/Shipments";
import Deals from "../Pages/Deals/Deals";
import GetDeal from "../Pages/getDeal/GetDeal";
import Layout from "../Pages/Layout/Layout";
import AddUser from "../Pages/AddUser/AddUser";
import Profile from "../Pages/Profile";
import ShipmentDetails from "../Pages/ShipmentDetails/ShipmentDetails";
import Reports from "../Pages/Reports/Reports";
import TripDetails from "../Pages/TripDetails/TripDetails";
import ReportDetails from "../Pages/ReportDetails/ReportDetails";
import ChangeLogDetails from "../Pages/ChangeLogDetals/index";
import Supports from "../Pages/Supports/Supports";
import SupportDetails from "../Pages/Supports/SupportDetails";
import Refunds from "../Pages/Refunds/Refunds";
import RefundDetails from "../Pages/Refunds/RefundDetails";
import Feedback from "../Pages/Feedback/Feedback";
import FeedbackDetails from "../Pages/FeedbackDetails/FeedbackDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login />, index: true },
      {
        path: "landingPage",
        element: <LandingPage />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          { path: "users", element: <Users /> },
          { path: "profile", element: <Profile /> },
          { path: "add-user", element: <AddUser /> },
          { path: "trips", element: <Trips /> },
          { path: "shipments", element: <Shipments /> },
          { path: "deals", element: <Deals /> },
          { path: "users/:id", element: <UserDetails /> },
          { path: "deals/:dealId", element: <GetDeal /> },
          { path: "shipments/:id", element: <ShipmentDetails /> },
          { path: "reports", element: <Reports /> },
          { path: "trips/:id", element: <TripDetails /> },
          { path: "reports/:id", element: <ReportDetails /> },
          { path: "change-log/:id", element: <ChangeLogDetails /> },
          { path: "supports", element: <Supports /> },
          { path: "supports/:id", element: <SupportDetails /> },
          { path: "refunds", element: <Refunds /> },
          { path: "refunds/:id", element: <RefundDetails /> },
          { path: "feedback", element: <Feedback /> },
          { path: "feedback/:id", element: <FeedbackDetails /> },
        ],
      },
    ],
  },
]);
