import React from 'react'
import { StyledTableCell } from './TableStyles'
import { Chip, Stack } from '@mui/material'

export default function VerifyCell({ isVerified }) {
    return (
        <StyledTableCell>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                <Chip
                    label={isVerified ? "Verified" : "Not Verified"}
                    size="small"
                    sx={{
                        backgroundColor: `${isVerified ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}`,
                        color: `${isVerified ? '#4CAF50' : '#f44336'}`,
                        '&:hover': {
                            backgroundColor: `${isVerified ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'}`,
                        },
                    }}
                />
            </Stack>
        </StyledTableCell>
    );
}
