import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function ShipmentsTable() {
  const shipments = useSelector((state) => state.shipments.shipments);
  const filteredShipments = useSelector((state) => state.shipments.filteredShipments);

  const displayShipments = filteredShipments.length > 0 ? filteredShipments : shipments;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success";
      case "in transit":
        return "info";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 650 }} aria-label="shipments table">
          <TableHead>
            <TableRow>
              <TableCell>Tracking Number</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayShipments.map((shipment) => (
              <TableRow
                key={shipment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {shipment.trackingNumber}
                </TableCell>
                <TableCell>{shipment.customer}</TableCell>
                <TableCell>
                  <Chip
                    label={shipment.status}
                    color={getStatusColor(shipment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{shipment.date}</TableCell>
                <TableCell>${shipment.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {displayShipments.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No shipments found
          </Typography>
        </Box>
      )}
    </Box>
  );
} 