import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import { motion } from 'framer-motion';
import { ToastContainer } from "react-toastify";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ScaleIcon from '@mui/icons-material/Scale';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RefactoredTable from "../RefactoredTable/RefactoredTable";
import CountryCell from "../TableCells/CountryCell";
import IdCell from "../TableCells/IdCell";
import DateCell from "../TableCells/DateCell";
import { StyledTableCell } from "../TableCells/TableStyles";
import MoneyCell from "../TableCells/MoneyCell";
import { fetchShipments } from "../../redux/Slices/shipmentSlice";

const shipmentsTableHeaders = [
  "",
  "ID",
  { icon: <FlightTakeoffIcon sx={{ fontSize: "1rem" }} />, label: "From" },
  { icon: <FlightLandIcon sx={{ fontSize: "1rem" }} />, label: "To" },
  { icon: <ListAltIcon sx={{ fontSize: "1rem" }} />, label: "Title" },
  { icon: <CalendarTodayIcon sx={{ fontSize: "1rem" }} />, label: "Expected Date" },
  { icon: <PriceChangeIcon sx={{ fontSize: "1rem" }} />, label: "Total Price" },
  { icon: <ScaleIcon sx={{ fontSize: "1rem" }} />, label: "Weight" },
];

export default function ShipmentsGrid() {
  const { shipments, loading, error, totalData } = useSelector((state) => state.shipments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowClick = (shipmentId) => {
    navigate(`/landingPage/shipments/${shipmentId}`);
  };

  const handlePageChange = (page, rowsPerPage) => {
    dispatch(fetchShipments({ page, take: rowsPerPage, latest: true }));
  };

  const renderCell = (shipment, index) => (
    <>
      <StyledTableCell>
        <Typography variant="body2">
          {index + 1}
        </Typography>
      </StyledTableCell>
      <IdCell id={shipment.id} />
      <CountryCell
        country={shipment.from || "N/A"}
        city={shipment.fromCity}
        flag={shipment.from ? `https://flagcdn.com/w40/${shipment.from.toLowerCase()}.png` : "/placeholder.jpg"}
      />
      <CountryCell
        country={shipment.to || "N/A"}
        city={shipment.toCity}
        flag={shipment.to ? `https://flagcdn.com/w40/${shipment.to.toLowerCase()}.png` : "/placeholder.jpg"}
      />
      <StyledTableCell>
        <Typography variant="body2">
          {shipment.title || "N/A"}
        </Typography>
      </StyledTableCell>
      <DateCell date={shipment.expectedDate} />
      <MoneyCell amount={shipment.totalPrice} reward={shipment.reward}/>
      <StyledTableCell>
        <Typography variant="body2">
          {shipment.weight ? `${shipment.weight} kg` : "N/A"}
        </Typography>
      </StyledTableCell>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <ToastContainer />
        <RefactoredTable
          data={shipments || []}
          headers={shipmentsTableHeaders}
          renderCell={renderCell}
          onRowClick={handleRowClick}
          pageSize={10}
          pageSizeOptions={[5, 10, 20]}
          enableContextMenu={false}
          loading={loading}
          error={error}
          totalItems={totalData}
          onPageChange={handlePageChange}
          serverSidePagination={true}
        />
      </Box>
    </motion.div>
  );
}