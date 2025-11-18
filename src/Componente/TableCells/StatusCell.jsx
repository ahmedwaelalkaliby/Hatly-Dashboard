import React from 'react';
import { Box } from '@mui/material';
import { StyledTableCell } from './TableStyles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function StatusCell({ status }) {
  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
  if (status === "resolved") {
    return (
      <StyledTableCell>
        <TaskAltIcon sx={{ color: "#4CAF50" }} />
      </StyledTableCell>
    );
  }

  if (status === "rejected") {
    return (
      <StyledTableCell>
        <HighlightOffIcon sx={{ color: "#F44336" }} />
      </StyledTableCell>
    );
  }
  if (status === "approved" || status === "RESOLVED") {
    return (
      <StyledTableCell>
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.9,
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 500,
            bgcolor: "primary.light",
            color: "white",
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: "primary.main",
            }
          }}
        >
          {capitalizedStatus || "N/A"}
        </Box>
      </StyledTableCell>
    );
  }
  if (status === "completed" || status === "COMPLETED") {
    return (
      <StyledTableCell>
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.9,
            borderRadius: "6px",
            fontSize: "0.8rem",
            fontWeight: 500,
            bgcolor: "warning.light",
            color: "white",
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: "warning.main",
            }
          }}
        >
          {capitalizedStatus || "N/A"}
        </Box>
      </StyledTableCell>
    );
  }
  if (status === "pending") {
    return (
      <StyledTableCell>
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.9,
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 500,
            bgcolor: "rgba(255, 152, 0, 0.1)",
            color: "#f57c00",
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: "rgba(255, 152, 0, 0.2)",
            }
          }}
        >
          {capitalizedStatus || "N/A"}
        </Box>
      </StyledTableCell>
    );
  }
  if (status === "cancelled" || status === "REJECTED") {   
    return (
      <StyledTableCell>
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.9,
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 500,
            bgcolor: "error.light",
            color: "white",
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: "error.main",
            }
          }}

        >
          {capitalizedStatus || "N/A"}
        </Box>
      </StyledTableCell>
    );
  }
  if (status === "in_progress" || status === "IN_PROGRESS") {
    return (
      <StyledTableCell>
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.9,
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 500,
            bgcolor: "info.light",
            color: "white",
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: "info.main",
            }
          }}
        >
          {"In Progress"}
        </Box>
      </StyledTableCell>
    );
  }

  return (
    <StyledTableCell>
      <Box
        component="span"
        sx={{
          px: 1.5,
          py: 0.9,
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: 500,
          bgcolor: "rgba(255, 152, 0, 0.1)",
          color: "#f57c00",
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: "rgba(255, 152, 0, 0.2)",
          }
        }}
      >
        {status || "N/A"}
      </Box>
    </StyledTableCell>
  );
}