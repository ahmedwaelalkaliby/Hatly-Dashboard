import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterBtnMenu from "../FilterComponents/FilterBtnMenu";

export default function FeedbackBtnNavFilter({ onStatusFilterChange }) {
  const [status, setStatus] = useState("");

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (onStatusFilterChange) {
      onStatusFilterChange(newStatus);
    }
  };

  const handleClearStatus = () => {
    setStatus("");
    if (onStatusFilterChange) {
      onStatusFilterChange("");
    }
  };

  const handleClearFilters = () => {
    setStatus("");
    if (onStatusFilterChange) {
      onStatusFilterChange("");
    }
  };

  return (
    <FilterBtnMenu>
      {/* Status Filter */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="feedback-status-select-label">Status</InputLabel>
        <Select
          labelId="feedback-status-select-label"
          label="Status"
          value={status}
          onChange={handleStatusChange}
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
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      {/* Clear All Filters Button */}
      {(status) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <MenuItem
            onClick={handleClearFilters}
            sx={{
              color: 'red',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
              }
            }}
          >
            Clear All Filters
          </MenuItem>
        </Box>
      )}
    </FilterBtnMenu>
  );
} 