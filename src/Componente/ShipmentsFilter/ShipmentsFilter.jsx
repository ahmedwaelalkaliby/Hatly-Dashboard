import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowFilter,
  setFilteredShipments,
  setFilters,
} from "../../Redux/Reducers/shipmentsSlice";

export default function ShipmentsFilter() {
  const dispatch = useDispatch();
  const { showFilter, shipments, filters } = useSelector((state) => state.shipments);

  const handleClose = () => {
    dispatch(setShowFilter(false));
  };

  const handleFilterChange = (field, value) => {
    dispatch(setFilters({ ...filters, [field]: value }));
  };

  const handleApplyFilter = () => {
    let filtered = [...shipments];

    if (filters.status) {
      filtered = filtered.filter((shipment) => shipment.status === filters.status);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (shipment) =>
          shipment.trackingNumber.toLowerCase().includes(searchTerm) ||
          shipment.customerName.toLowerCase().includes(searchTerm)
      );
    }

    dispatch(setFilteredShipments(filtered));
    handleClose();
  };

  const handleReset = () => {
    dispatch(setFilters({ status: "", search: "" }));
    dispatch(setFilteredShipments(shipments));
    handleClose();
  };

  return (
    <Dialog open={showFilter} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Filter Shipments</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Transit">In Transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleApplyFilter} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
} 