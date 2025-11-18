import React from 'react';
import { Box } from '@mui/material';
import { StyledTableCell } from './TableStyles';

export default function DealStatusCell({ dealStatus }) {
  return (
    <StyledTableCell>
      <Box
        component="span"
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 500,
          textTransform: 'capitalize',
          display: 'inline-flex',
          alignItems: 'center',
          ...(dealStatus === 'accepted' && {
            bgcolor: 'rgba(76, 175, 80, 0.1)',
            color: '#2e7d32',
          }),
          ...(dealStatus === 'rejected' && {
            bgcolor: 'rgba(244, 67, 54, 0.1)',
            color: '#d32f2f',
          }),
          ...(!['accepted', 'rejected'].includes(dealStatus) && {
            bgcolor: 'rgba(255, 152, 0, 0.1)',
            color: '#f57c00',
          }),
        }}
      >
        {dealStatus || 'N/A'}
      </Box>
    </StyledTableCell>
  );
}
