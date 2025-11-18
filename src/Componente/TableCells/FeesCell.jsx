import React from 'react'
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { StyledTableCell } from './TableStyles';
import { Stack, Tooltip, Typography } from '@mui/material';

export default function FeesCell({ finalReward, counterReward, fees, paymentFees }) {
    return (
        <StyledTableCell>
            <Stack spacing={0.5} direction="column" justifyContent={"center"} alignItems="flex-start">
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <PriceChangeIcon sx={{ width: 16, height: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="text.secondary">
                        Reward:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                        ${finalReward || counterReward || 0}
                    </Typography>
                </Stack>
                <Tooltip title="Service Fees" arrow>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                            Fees: ${fees}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            | Payment: ${paymentFees}
                        </Typography>
                    </Stack>
                </Tooltip>
            </Stack>
        </StyledTableCell>
    )
}
