import React from 'react'
import { FormControl, IconButton, TextField } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";

export default function DateSelect({ label, date, setDate, onClearSelect}) {
    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
                label={label}
                variant="outlined"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: {
                        max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
                        'aria-label': `Select ${label} date`
                    },
                    input: {
                        endAdornment: date && (
                            <IconButton
                                size="small"
                                onClick={onClearSelect}
                                aria-label={`Clear ${label} date`}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        ),
                    },
                }}
            />
        </FormControl>
    )
}
