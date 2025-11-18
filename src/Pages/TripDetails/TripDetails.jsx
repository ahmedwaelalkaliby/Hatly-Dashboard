import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScaleIcon from '@mui/icons-material/Scale';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { FaImage, FaCamera, FaTimes } from 'react-icons/fa';
import { formatDate } from '../../Utils/utilFunctions.js';
import { fetchTripDetails, resetTripDetails, useVerifyTrip } from '../../redux/Slices/TripDetailsSlice';
import { toast, ToastContainer } from 'react-toastify';
import HeaderContainer from '../../Componente/internals/HeaderContainer';
import UserCard from '../../Componente/internals/UserCard';
import DealsTable from '../../Componente/internals/DealsTable';
import Timeline from '../../Componente/internals/Timeline';
import HorizontalTimeline from '../../Componente/internals/HorizontalTimeline';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
}));

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trip, user, deals, status, error } = useSelector((state) => state.tripDetails);
  const verifyTripMutation = useVerifyTrip();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [verifying, setVerifying] = useState(false); // Add this line

  const handleVerifyTrip = () => {
    setVerifying(true);
    verifyTripMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Trip verified successfully!');
        // Update trip verification status locally instead of refetching
        const updatedTrip = { ...trip, isVerified: true };
        dispatch({ type: 'tripDetails/updateTripVerification', payload: updatedTrip });
        setVerifying(false);
      },
      onError: () => {
        toast.error('Failed to verify trip.');
        setVerifying(false);
      },
    });
  };

  useEffect(() => {
    dispatch(fetchTripDetails(id));
    return () => {
      dispatch(resetTripDetails());
    };
  }, [dispatch, id]);

  const renderPhotoModal = () => (
    showPhotoModal && (
      <div className="fixed inset-0 z-50 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div 
            className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
            onClick={() => setShowPhotoModal(false)}
          ></div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Ticket Photo</h3>
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              <div className="flex justify-center min-h-screen">
                <img
                  src={trip?.bookInfo?.ticketPhoto}
                  alt="Ticket"
                  className="max-h-[80vh] w-auto object-contain rounded-lg shadow-lg min-w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  if (status === 'loading' || !trip) {
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
          {error || 'Failed to load trip details'}
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
  const timeLineItems = [
    { icon: <CalendarMonthIcon sx={{ fontSize: 25, color: '#1976d2' }} />, title: 'Departure Date', value: formatDate(trip.departDate) },
    { icon: <ScaleIcon sx={{ fontSize: 25, color: '#2e7d32' }} />, title: 'Available Weight', value: `${trip.available} kg` },
    { icon: <VisibilityIcon sx={{ fontSize: 25, color: '#ed6c02' }} />, title: 'Views', value: trip.viewCount },
    { icon: <LocationOnIcon sx={{ fontSize: 25, color: '#9c27b0' }} />, title: 'Meeting Address', value: trip.addressMeeting || 'Not specified' },
    { icon: <EditNoteIcon sx={{ fontSize: 25, color: '#fbc02d' }} />, title: 'Created at', value: formatDate(trip.createdAt) },
    { icon: <ChangeCircleIcon sx={{ fontSize: 25, color: '#f44336' }} />, title: 'Updated at', value: formatDate(trip.updatedAt) }
  ];
  const horizontalTimeLineItems = [
      {
        icon: <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        title: 'Passenger',
        value: `${trip.bookInfo?.firstName || ''} ${trip.bookInfo?.lastName || ''}`
      },
      {
        icon: <FlightTakeoffIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        title: 'Airline',
        value: trip.bookInfo?.airline || 'N/A'
      },
      {
        icon: <TaskAltIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        title: 'Booking Reference',
        value: trip.bookInfo?.bookingReference || 'N/A'
      }
    ];
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
          Back to Trips
        </Button>
        <button
          onClick={handleVerifyTrip}
          disabled={verifying || trip.isVerified}
          className={`ml-auto bg-secondary-600 text-white rounded-full px-4 py-2 flex items-center hover:bg-secondary-500 transition duration-300 ease-in-out ${verifying || trip.isVerified ? 'bg-gray-400 hover:bg-gray-600 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {verifying ? (
            <CircularProgress size={16} sx={{ color: 'white' }} />
          ) : (
            <TaskAltIcon sx={{ fontSize: 16, color: 'white' }} />
          )}
          <Typography variant="button" fontWeight="bold" color="white" sx={{ ml: 1 }}>
            {verifying ? 'Verifying...' : 'Verify Trip'}
          </Typography>
        </button>

        <HeaderContainer
          origin={trip.origin}
          destination={trip.destination}
          originCity={trip.originCity}
          destinationCity={trip.destinationCity}
          title={trip.title}
          isVerified={trip.isVerified}
          id={trip.id}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Trip Details
              </Typography>
              <Timeline items={timeLineItems} />
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <UserCard user={user} />
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  Booking Info
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <HorizontalTimeline timelineItems={horizontalTimeLineItems} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {trip?.bookInfo?.ticketPhoto ? (
                      <div 
                        className="cursor-pointer group relative"
                        onClick={() => setShowPhotoModal(true)}
                      >
                        <div className="h-80 w-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                          <img
                            src={trip.bookInfo.ticketPhoto}
                            alt="Ticket"
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                              <FaCamera className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Click to view ticket photo
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-40 w-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center shadow-sm">
                        <FaImage className="h-16 w-16 text-gray-400 mb-2" />
                        <Typography variant="body2" color="text.secondary" align="center">
                          No ticket photo available
                        </Typography>
                      </div>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Box sx={{
                p: 2,
                borderRadius: '12px',
                bgcolor: 'rgba(244, 67, 54, 0.05)',
                border: '1px solid rgba(244, 67, 54, 0.1)',
                mt: 2
              }}>
                <Typography variant="subtitle1" fontWeight="bold" color="error" gutterBottom>
                  Restricted Items
                </Typography>
                <Box sx={{
                  p: 2,
                  bgcolor: 'rgba(244, 67, 54, 0.05)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <TaskAltIcon sx={{ fontSize: 32, color: 'error.main' }} />
                  <Typography variant="h6" fontWeight="medium" color="error">
                    {trip?.itemsNotAllowed?.map((item) => item.name).join(', ') || 'None'}
                  </Typography>
                </Box>
              </Box>
            </StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Deals
              </Typography>
              <Box sx={{ p: { xs: 1, sm: 2 } }}>
                <DealsTable deals={deals} />
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
      {renderPhotoModal()}
    </motion.div>
  );
}
