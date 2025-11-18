import React from 'react';
import { Stack, Typography, Tooltip } from '@mui/material';
import { StyledTableCell } from './TableStyles';

export default function ShipmentCell({ title, fromCity, toCity }) {
  return (
    <StyledTableCell sx={{ maxWidth: '140px' }}>
      <Stack spacing={0.5}>
        <Tooltip title={title || "N/A"} arrow placement="top">
          <Typography 
            variant="body2" 
            fontWeight={600}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {title || "N/A"}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          From: {fromCity || "N/A"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          To: {toCity || "N/A"}
        </Typography>
      </Stack>
    </StyledTableCell>
  );
}