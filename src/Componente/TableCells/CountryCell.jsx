import React from 'react'
import { StyledTableCell } from './TableStyles'
import { Box, Stack, Typography } from '@mui/material'
import { useCountries } from '../../context/CountriesProvider';
const baseUrl = import.meta.env.BASE_URL;

export default function CountryCell({ country = "N/A", city = "N/A", flag }) {
  const { countries } = useCountries();
  const countryFullName = countries.find(c => c.iso2 === country);
  const defaultFlag = baseUrl + "placeholder.jpg";

  return (
    <StyledTableCell>
      <Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            component="img"
            src={flag || defaultFlag}
            alt={`${country} flag`}
            sx={{ width: 24, height: 24, borderRadius: "50%" }}
          />
          <Stack direction="column">
            <Typography variant="body2" fontWeight={600}>
              {countryFullName?.name || country}
            </Typography>
            {city !== undefined && city !== null
              && <Typography variant="body2" color="text.secondary">
                {city}
              </Typography>}
          </Stack>
        </Stack>
      </Stack>
    </StyledTableCell>
  )
}
