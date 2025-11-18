import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, Typography, Divider, Button } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";

import FilterBtnMenu from '../FilterComponents/FilterBtnMenu'
import { fetchReports } from '../../redux/Slices/reportsSlice';
import DateSelect from '../FilterComponents/DateSelect';

export default function ReportsBtnNavFilter() {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleClearStatus = () => {
    setStatus("");
    dispatch(fetchReports({ type, createdAt }));
  };
  
  const handleClearType = () => {
    setType("");
    dispatch(fetchReports({ status, createdAt }));
  };
  
  const handleClearDate = () => {
    setCreatedAt("");
    dispatch(fetchReports({ status, type }));
  };

  const handleClearFilters = () => {
    handleClearStatus();
    handleClearType();
    handleClearDate();
    dispatch(fetchReports({ page: 1, take: 3 }));
  };

  useEffect(() => {
    if (status || type || createdAt) {
      dispatch(fetchReports({
        status,
        type,
        createdAt
      }));
    }
  }, [status, type, createdAt, dispatch]);

  return (
    <FilterBtnMenu>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Filter Reports
        </Typography>
        <Button onClick={handleClearFilters} size="small" aria-label="Clear all filters" sx={{ color: "white", backgroundColor: "red" }} variant="contained" disableElevation>
          Clear Filters
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          endAdornment={
            status && (
              <IconButton
                size="small"
                sx={{ color: "red", marginRight: "15px" }}
                onClick={handleClearStatus}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          endAdornment={
            type && (
              <IconButton
                size="small"
                sx={{ color: "red", marginRight: "15px" }}
                onClick={handleClearType}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <MenuItem value="other">Other</MenuItem>
          <MenuItem value="missing_item">Missing Item</MenuItem>
          <MenuItem value="wrong_info">Wrong Info</MenuItem>
        </Select>
      </FormControl>

      <DateSelect 
        label="Created At" 
        date={createdAt} 
        setDate={setCreatedAt} 
        onClearSelect={handleClearDate} 
      />
    </FilterBtnMenu>
  )
}
