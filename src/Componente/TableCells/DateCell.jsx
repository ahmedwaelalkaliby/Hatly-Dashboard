import React from 'react'
import { formatDate } from '../../Utils/utilFunctions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { StyledTableCell } from './TableStyles';
import { Stack, Typography } from '@mui/material';

export default function DateCell({ date }) {
  
  return (
    <StyledTableCell>
      <Stack direction="row" spacing={1} alignItems="center">
        <CalendarMonthIcon sx={{ width: 16, height: 16, color: 'primary.main' }} />
        <Typography variant="body2" fontWeight="medium">
          {formatDate(date)}
        </Typography>
      </Stack>
    </StyledTableCell>
  );
}
