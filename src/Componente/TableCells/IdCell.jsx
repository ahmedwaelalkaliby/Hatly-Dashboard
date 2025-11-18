import React from 'react';
import { Typography, Tooltip, TableCell } from '@mui/material';
import { toast } from 'react-toastify';
import { StyledTableCell } from './TableStyles';

export default function IdCell({ id }) {
  const handleCopyId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    toast.success("ID copied to clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <StyledTableCell
      sx={{
        maxWidth: '120px'
      }}>
      <Tooltip title="Click to copy ID" arrow>
        <Typography
          onClick={handleCopyId}
          sx={{
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' },
            fontFamily: 'monospace',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {id}
        </Typography>
      </Tooltip>
    </StyledTableCell>
  );
}
