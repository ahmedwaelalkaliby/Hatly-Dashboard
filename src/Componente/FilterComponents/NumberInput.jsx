import React from 'react'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";

export default function NumberInput({
  label,
  name,
  numberValue,
  handleNumberChange,
  handleClearInput,
  error,
  helperText,
  max = 50,
}) {
  const handleKeyDown = (e) => {
    if (['-', '+', 'e', 'E'].includes(e.key) || (e.key === '0' && e.target.value.length === 0)) {
      e.preventDefault();
    }
  };
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <TextField
        label={label}
        type="number"
        name={name || label.toLowerCase()}
        value={numberValue}
        onChange={handleNumberChange}
        onKeyDown={handleKeyDown}
        error={error ?? false}
        helperText={helperText}
        fullWidth
        slotProps={{
          input: {
            endAdornment: numberValue && <InputAdornment position="end" >
                <IconButton
                  size="small"
                  onClick={handleClearInput}
                  aria-label={`Clear ${label} value`}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
          },
          htmlInput: {
            min: 1,
            max: max,
            step: 5,
            "aria-label": `Enter ${label} value`
          }
        }}
      />
    </FormControl >
  )
}
