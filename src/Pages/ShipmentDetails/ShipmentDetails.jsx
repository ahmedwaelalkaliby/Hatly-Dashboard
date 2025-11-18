import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
  Stack,
  Card,
  CardContent,
  CardMedia,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ScaleIcon from '@mui/icons-material/Scale';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { fetchShipmentDetails, resetShipmentDetails } from '../../redux/Slices/ShipmentDetailsSlice';
import { ToastContainer } from 'react-toastify';
import HeaderContainer from '../../Componente/internals/HeaderContainer';
import Timeline from '../../Componente/internals/Timeline';
import { formatDate } from '../../Utils/utilFunctions';

import UserCard from '../../Componente/internals/UserCard';
import DealsTable from '../../Componente/internals/DealsTable';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: 'none',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
}));

export default function ShipmentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipment, user, deals, status, error } = useSelector((state) => state.shipmentDetails);

  useEffect(() => {
    dispatch(fetchShipmentDetails(id));
    return () => {
      dispatch(resetShipmentDetails());
    };
  }, [dispatch, id]);

  if (status === 'loading' || !shipment) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error" variant="h6">
          {error || 'Failed to load shipment details'}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%' }}
    >
      <Box sx={{ width: '100%' }}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back to Shipments
        </Button>

        <HeaderContainer
          origin={shipment?.from}
          originCity={shipment?.fromCity}
          destination={shipment?.to}
          destinationCity={shipment?.toCity}
          title={shipment.title}
          id={shipment.id}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StyledPaper>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Shipment Details
                </Typography>
                <Timeline items={[
                  {
                    icon: <CalendarMonthIcon sx={{ fontSize: 30, color: ' #1976d2' }} />,
                    title: 'Expected Date',
                    value: formatDate(shipment.expectedDate),
                  },
                  {
                    icon: <PriceChangeIcon sx={{ fontSize: 30, color: '#2e7d32' }} />,
                    title: 'Total Price',
                    value: `${shipment.totalPrice} USD`,
                  },
                  {
                    icon: <ScaleIcon sx={{ fontSize: 30, color: '#ed6c02' }} />,
                    title: 'Weight',
                    value: `${shipment.weight} kg`,
                  },
                  {
                    icon: <VisibilityIcon sx={{ fontSize: 30, color: '#9c27b0' }} />,
                    title: 'Views',
                    value: shipment.viewCount,
                  },
                  {
                    icon: <EditNoteIcon sx={{ fontSize: 30, color: '#fbc02d' }} />,
                    title: 'Created at',
                    value: formatDate(shipment.createdAt),
                  },
                  {
                    icon: <ChangeCircleIcon sx={{ fontSize: 30, color: '#f44336' }} />,
                    title: 'Updated at',
                    value: formatDate(shipment.updatedAt),
                  }
                ]} />
              </StyledPaper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <UserCard user={user} />
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  Items ({shipment.items?.length || 0})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Items Weight: {shipment.items?.reduce((acc, item) => acc + (item.itemWeight * item.quantity), 0).toFixed(2)} kg
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {shipment.items?.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <StyledCard>
                      <Box sx={{ position: 'relative', pt: '56.25%' }}>
                        <CardMedia
                          component="img"
                          image={item.photos[0]?.url}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://fakeimg.pl/600x400?text=N/A';
                          }}
                          alt={item.name}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            p: 1,
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" fontWeight="bold" noWrap>
                            {item.name}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              {item.category}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium" color="primary">
                              ${item.price}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Weight: {item.itemWeight} kg
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Qty: {item.quantity}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Deals ({deals?.length || 0})
              </Typography>
              <Box sx={{ p: { xs: 1, sm: 2 } }}>
                <DealsTable deals={deals} />
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
