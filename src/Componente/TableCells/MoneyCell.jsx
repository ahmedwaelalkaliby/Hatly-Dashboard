import React from 'react';
import { Stack, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { StyledTableCell } from './TableStyles';
import GradeIcon from '@mui/icons-material/Grade';

export default function MoneyCell({ amount, reward }) {
  console.log('MoneyCell', amount, reward); // Debugging line
  return (
    <StyledTableCell>
      <Stack direction="row" spacing={1} alignItems="center" >
        <AttachMoneyIcon sx={{ width: 16, height: 16 , color: 'success.main' }} />
        <Typography variant="body2" fontWeight="medium" color="success.main">
          {amount?.toFixed(2) || '0.00'}
        </Typography>
      </Stack>
        {reward !== undefined && reward !== null && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <Typography variant="body2" fontWeight="medium" color="text.secondary">
              Reward: 
            </Typography>
            <Typography variant="body2" fontWeight="medium" color="secondary.main">
              {reward}
            </Typography>
          </ Stack>
        )}
    </StyledTableCell>
  );
}
