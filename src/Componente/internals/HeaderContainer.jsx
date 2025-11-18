import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { motion } from 'framer-motion';
import { useCountries } from '../../context/CountriesProvider';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  minHeight: '200px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const FlagImage = styled('img')(({ theme }) => ({
  width: '280px',
  height: '140px',
  objectFit: 'cover',
  borderRadius: '8px',
  border: '2px solid #fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    width: '140px',
    height: '70px',
  },
}));

export default function HeaderContainer({
  origin = 'Not Available',
  destination = 'Not Available',
  title = undefined,
  isVerified = undefined,
  id = 'Not Available',
  originCity = 'Not Available',
  destinationCity = 'Not Available'
}) {
  const { countries } = useCountries();
  const originCountryFullName = countries.find(c => c.iso2 === origin);
  const destinationCountryFullName = countries.find(c => c.iso2 === destination);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Container>
        <Stack alignItems="flex-start">
          <Typography variant="h6" component="h6" fontWeight="bold" color="primary">
            Origin:
          </Typography>
          <FlagImage
            src={`https://flagcdn.com/w320/${origin?.toLowerCase() || 'us'}.png`}
            alt={`${origin || 'N/A'} flag`}
          />
          <Typography variant="h6" fontWeight="bold" color="primary">
            {originCountryFullName?.name || origin || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="primary.main">
            {originCity || 'N/A'}
          </Typography>
        </Stack>

        <Stack alignItems="center" spacing={2}>
          {title !== undefined && <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
            {title}
          </Typography>}
          <Typography variant="subtitle1" color="text.secondary">
            ID: {id}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <FlightTakeoffIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h6" color="primary.main">
              →
            </Typography>
            <FlightLandIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          </Stack>
          {isVerified !== undefined && <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${isVerified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {isVerified ? 'Verified' : 'Not Verified'}
          </div>}
        </Stack>

        <Stack alignItems="flex-start">
          <Typography variant="h6" component="h6" fontWeight="bold" color="primary">
            Destination:
          </Typography>
          <FlagImage
            src={`https://flagcdn.com/w320/${destination?.toLowerCase()}.png`}
            alt={`${destination || 'N/A'} flag`}
          />
          <Typography variant="h6" fontWeight="bold" color="primary">
            {destinationCountryFullName?.name || destination || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="primary.main">
            {destinationCity || 'N/A'}
          </Typography>
        </Stack>
      </Container>
    </motion.div>
  );
}