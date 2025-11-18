import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Box, Typography} from "@mui/material";
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BlockIcon from '@mui/icons-material/Block';
import { CheckCircle } from "@mui/icons-material";
import ScaleIcon from '@mui/icons-material/Scale';
import RefactoredTable from "../RefactoredTable/RefactoredTable";
import { fadeIn } from "../../Utils/motion";
import IdCell from "../TableCells/IdCell";
import CountryCell from "../TableCells/CountryCell";
import DateCell from "../TableCells/DateCell";
import VerifyCell from "../TableCells/VerifyCell";
import { fetchTrips } from "../../redux/Slices/tripsSlice";
import { StyledTableCell } from "../TableCells/TableStyles";
import axiosInstance from "../../Utils/axiosInstance";


const tripsTableHeaders = [
  "",
  "ID",
  { icon: <FlightTakeoffIcon sx={{ fontSize: "1rem" }} />, label: "From" },
  { icon: <FlightLandIcon sx={{ fontSize: "1rem" }} />, label: "To" },
  { icon: <ScaleIcon sx={{ fontSize: "1rem" }} />, label: "Weight" },
  { icon: <LocationOnIcon sx={{ fontSize: "1rem" }} />, label: "Address Meeting" },
  { icon: <CalendarTodayIcon sx={{ fontSize: "1rem" }} />, label: "Departure Date" },
  { icon: <CheckCircle sx={{ fontSize: "1rem" }} />, label: "Verification" },


];
export default function TripsGrid() {
  const { trips, loading, error, totalData, totalPages } = useSelector((state) => state.trips);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = (page, rowsPerPage) => {
    dispatch(fetchTrips({ page, take: rowsPerPage, latest: true }));
  };
  const handleRowClick = (tripId) => {
    navigate(`/landingPage/trips/${tripId}`);
  };
  const handleDeleteTrip = async (tripId) => {
    // const response = await axiosInstance.delete(`/trip/${tripId}`);
    // if (response.status === 200) {
    //   dispatch(fetchTrips({ page: 1, take: 3 }));
      toast.success("Trip deleted successfully");
    // }
    console.log(`Deleting trip with ID: ${tripId}`);
  }

  const contextMenuItems = [
    { label: "Edit", icon: <FlightTakeoffIcon />, onClick: (trip) => handleRowClick(trip.id) },
    { label: "Delete", icon: <BlockIcon />, onClick: (trip) => handleDeleteTrip(trip.id) },
  ];

  const renderCell = (trip, index) => {
    return (
      <>
        <StyledTableCell>
          <Typography variant="body2">
            {index + 1}
          </Typography>
        </StyledTableCell>
        <IdCell id={trip.id} />
        <CountryCell
          country={trip.origin || "N/A"}
          city={trip.originCity}
          flag={trip.origin ? `https://flagcdn.com/w40/${trip.origin.toLowerCase()}.png` : "/placeholder.jpg"}
        />
        <CountryCell
          country={trip.destination || "N/A"}
          city={trip.destinationCity}
          flag={trip.destination ? `https://flagcdn.com/w40/${trip.destination.toLowerCase()}.png` : "/placeholder.jpg"}
        />
        {/* implement a cell for available weight */}
        <StyledTableCell sx={{ maxWidth: "60px" }}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center",justifyContent: "center" }}>
            {trip.available|| "N/A"} kg
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography variant="body2">
            {trip.addressMeeting || "N/A"}
          </Typography>
        </StyledTableCell>
        <DateCell  date={trip.departDate} />
        <VerifyCell isVerified={trip.isVerified} />
      </>
    );
  }

  return (
    <>
      <motion.div
        variants={fadeIn("right", "spring", 0.5, 1)}
        initial="hidden"
        animate="show"
      >
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <ToastContainer />
          <RefactoredTable
            data={trips}
            headers={tripsTableHeaders}
            renderCell={renderCell}
            contextMenuItems={contextMenuItems}
            pageSize={10}
            pageSizeOptions={[5, 10, 20]}
            loading={loading}
            error={error}
            onRowClick={handleRowClick}
            serverSidePagination={true}
            totalItems={totalData}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            enableContextMenu={true}
          />
        </Box>
      </motion.div>
    </>
  );
}