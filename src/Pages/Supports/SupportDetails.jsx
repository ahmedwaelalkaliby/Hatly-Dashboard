import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Box, Typography, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, TextField, Button, Divider, Stack, Tooltip, Menu, Paper, Grid, Chip, Avatar, Rating, Grid2 } from '@mui/material';
import {
  AdminPanelSettingsOutlined,
  DescriptionOutlined,
  Edit as EditIcon,
  Handshake as HandshakeIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,
} from '@mui/icons-material';
import { FaCamera } from 'react-icons/fa';
import KeyIcon from '@mui/icons-material/Key';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import RecyclingIcon from '@mui/icons-material/Recycling';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LockOpenIcon from '@mui/icons-material/LockOpen';


import { formatDate, formatTime } from '../../Utils/utilFunctions';
import {
  fetchSupportDetails, clearCurrentSupport, updateSupportStatus, completeDeal, refundDeal
} from '../../redux/Slices/supportSlice';
import { fadeIn, slideIn, staggerContainer } from '../../Utils/motion';
import { toast, ToastContainer } from 'react-toastify';
import HorizontalTimeline from '../../Componente/internals/HorizontalTimeline';
import PhotoModal from '../../Componente/internals/PhotoModal';

export default function SupportDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentSupport: support,
    loading,
    error,
    updateStatusLoading,
    updateStatusError,
    completeDealLoading,
    completeDealError,
    refundDealLoading,
    refundDealError
  } = useSelector(state => state.support);

  const [status, setStatus] = useState('');
  const [adminResponse, setAdminResponse] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handleOpenUpdateStatusMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUpdateStatusMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchSupportDetails(id));

    return () => {
      dispatch(clearCurrentSupport());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (support) {
      setStatus(support.status || '');
      setAdminResponse(support.adminResponse || '');
    }
  }, [support]);

  const submitUpdateSupportStatus = async (e) => {
    e.preventDefault();
    if (!status) {
      toast.error('Please select a status');
      return;
    }
    if (!adminResponse.trim()) {
      toast.error('Please provide an admin response');
      return;
    }

    try {
      await dispatch(updateSupportStatus({
        supportId: id,
        status,
        adminResponse
      })).unwrap();
      toast.success('Support status updated successfully', {
        onClose: () => {
          handleCloseUpdateStatusMenu();
        }
      });

    } catch (error) {
      toast.error(error || 'Failed to update support status');
    }
  };

  const handleCompleteDeal = async () => {
    try {
      await dispatch(completeDeal(support.deal.id)).unwrap();
      toast.success('Deal completed successfully');
    } catch (error) {
      toast.error(completeDealError || error || 'Failed to complete deal');
    }
  };

  const handleRefundDeal = async () => {
    try {
      await dispatch(refundDeal(support.deal.id)).unwrap();
      toast.success('Deal refunded successfully');
    } catch (error) {
      toast.error(refundDealError || error || 'Failed to refund deal');
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(support.id).then(() => {
      toast.success('ID copied to clipboard');
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        {/* change circular progress color */}
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!support) {
    return null;
  }

  const isRequesterShopper = support.requester.id === support.deal.shopperUserId;
  const timelineItems = [
    { title: 'Type', value: support.type, icon: <StyleIcon sx={{ color: 'primary.main', fontSize: 30 }} /> },
    { title: 'Status', value: support.status ?? 'N/A', icon: <SettingsIcon sx={{ color: 'primary.main', fontSize: 30 }} /> },
    { title: 'Deal Status', value: support.deal.dealStatus.toUpperCase(), icon: <HandshakeIcon sx={{ color: 'primary.main', fontSize: 30 }} /> },
  ];


  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      className="container"
    >
      <Box sx={{ p: 0, minHeight: '100vh', width: '100%' }}>
        <ToastContainer />
        {/* Header Section */}
        <motion.div variants={fadeIn("down", "spring", 0.1, 1)}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.200',
              width: '100%'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                  <Typography variant="h5" color="primary.900" fontWeight="600">
                    Support Request
                  </Typography>
                  <Tooltip title={`Click to copy ID`} arrow >
                    <Typography variant="body2" color="primary.main" onClick={handleCopyId} sx={{ cursor: 'pointer' }}>
                      Support ID: {support.id}
                    </Typography>
                  </Tooltip>
                  <Typography variant="body2" color="text.secondary">
                    Created on: {formatDate(support.createdAt) + ' - ' + formatTime(support.createdAt)}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button
                  endIcon={<EditIcon />}
                  onClick={handleOpenUpdateStatusMenu}
                  sx={{
                    textTransform: 'capitalize',
                    backgroundColor: 'primary.100',
                    '&:hover': {
                      backgroundColor: 'primary.200',
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>
                    Update Deal Status
                  </Typography>
                </Button>
              </Stack>
            </Box>

            <Grid2 container spacing={2} justifyContent="center">
              <HorizontalTimeline timelineItems={timelineItems} />
            </Grid2>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button
                onClick={handleCompleteDeal}
                disabled={support.deal.dealStatus !== 'paid' || completeDealLoading}
                sx={{
                  textTransform: 'capitalize',
                  color: 'white',
                  backgroundColor: 'secondary.main',
                  '&:disabled': {
                    backgroundColor: 'text.disabled',
                    color: 'rgba(255, 255, 255, 0.7)'
                  },
                  '&:hover': { backgroundColor: 'secondary.700' }
                }}
              >
                {completeDealLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Complete Deal'}
              </Button>
              <Button
                onClick={handleRefundDeal}
                disabled={support.deal.dealStatus !== 'completed' || refundDealLoading}
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  '&:disabled': {
                    backgroundColor: 'text.disabled',
                    color: 'rgba(255, 255, 255, 0.7)'
                  },
                  '&:hover': { backgroundColor: 'secondary.700' }
                }}
              >
                {refundDealLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Refund Deal'}
              </Button>
            </Stack>

          </Paper>
        </motion.div>

        <Stack spacing={3} sx={{ width: '100%' }}>
          {/* Support Details Section */}
          <motion.div variants={fadeIn("up", "spring", 0.2, 1)}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.12)'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Support Details
              </Typography>

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
                <Box sx={{ flexGrow: 1 }}>
                  <ol className="relative border-s border-gray-200">
                    <li className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                        <DescriptionOutlined sx={{ color: 'primary.main', fontSize: 30 }} />
                      </span>
                      <div className="items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex flex-col">
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {support.description}
                        </Typography>
                      </div>
                    </li>
                    <li className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                        <AdminPanelSettingsOutlined sx={{ color: 'primary.main', fontSize: 30 }} />
                      </span>
                      <div className="items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex flex-col">
                        <Typography variant="subtitle2" sx={{ mb: 1, fontSize: 16, color: 'primary.main' }}>
                          Admin Response
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14, color: 'text.secondary' }}>
                          {support.adminResponse}
                        </Typography>
                      </div>
                    </li>
                  </ol>

                </Box>

                {support.photoUrl && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center', color: 'text.secondary' }}>
                      Support Evidence
                    </Typography>
                    <Box
                      sx={{
                        width: '300px',
                        cursor: 'pointer',
                        position: 'relative',
                        '&:hover .overlay': {
                          opacity: 1
                        }
                      }}
                      onClick={() => setShowPhotoModal(true)}
                    >
                      <Box
                        component="img"
                        src={support.photoUrl}
                        alt="Support evidence"
                        sx={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: 1,
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <Box
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          borderRadius: 1
                        }}
                      >
                        <FaCamera size={24} color="white" />
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Photo Modal */}
                {showPhotoModal && <PhotoModal imageSrc={support.photoUrl} setShowPhotoModal={setShowPhotoModal} />}

              </Stack>
            </Paper>
          </motion.div>

          {/* Users Information Section */}
          <motion.div variants={fadeIn("up", "spring", 0.3, 1)}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                border: '1px solid  rgba(0, 0, 0, 0.12)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Users Information
              </Typography>

              <Grid container spacing={3}>
                {[
                  { user: support.deal.shopper, role: `${isRequesterShopper ? 'Requester' : 'Shopper'}`, label: 'Shopper' },
                  { user: support.deal.traveler, role: `${isRequesterShopper ? 'Traveler' : 'Requester'}`, label: 'Traveler' }
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div
                      variants={slideIn(index === 0 ? "left" : "right", "spring", 0.4 + index * 0.1, 0.8)}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          height: '100%',
                          borderRadius: 2,
                          backgroundColor: item.user.verify ? 'primary.50' : 'grey.50',
                          border: '1px solid',
                          borderColor: item.user.verify ? 'primary.200' : 'grey.200',
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          {/* Header */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Avatar
                              src={item.user.profilePhoto}
                              sx={{
                                width: 56,
                                height: 56,
                                border: '2px solid',
                                borderColor: item.user.verify ? 'primary.main' : 'grey.300'
                              }}
                            >
                              {item.user.firstName?.[0]}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 600,
                                  color: item.user.verify ? 'primary.900' : 'text.primary',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1
                                }}
                              >
                                {item.label}
                                {item.user.verify && (
                                  <Chip
                                    label="Verified"
                                    size="small"
                                    sx={{
                                      backgroundColor: 'primary.100',
                                      color: 'primary.700',
                                      height: 20,
                                      fontSize: '0.75rem'
                                    }}
                                  />
                                )}
                              </Typography>
                              <Chip
                                label={item.role}
                                size="small"
                                sx={{
                                  mt: 0.5,
                                  backgroundColor: 'primary.100',
                                  color: 'primary.700',
                                  height: 20,
                                  fontSize: '0.75rem'
                                }}
                              />
                            </Box>
                          </Box>

                          {/* User Details */}
                          <Stack spacing={1.5}>
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Full Name
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {item.user.firstName} {item.user.lastName}
                              </Typography>
                            </Box>

                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Email
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {item.user.email}
                              </Typography>
                            </Box>

                            {item.user.city && (
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  City
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {item.user.city}
                                </Typography>
                              </Box>
                            )}

                            {item.user.country && (
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  Country
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {item.user.country}
                                </Typography>
                              </Box>
                            )}

                            {item.user.address && (
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  Address
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {item.user.address}
                                </Typography>
                              </Box>
                            )}

                            {typeof item.user.averageRating !== 'undefined' && (
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  Rating
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Rating
                                    value={item.user.averageRating}
                                    readOnly
                                    precision={0.5}
                                    size="small"
                                  />
                                  <Typography variant="body2" color="text.secondary">
                                    ({item.user.averageRating.toFixed(1)})
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>

          {/* Deal Details */}
          <motion.div variants={fadeIn("up", "spring", 0.4, 1)}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.12)'
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Deal Details
                </Typography>

                <Stack spacing={1}>
                  <Tooltip title={`Click to copy ID`} arrow>
                    <Box
                      onClick={handleCopyId}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          width: '100px',
                          color: 'text.secondary'
                        }}
                      >
                        Deal ID:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary.main"
                      >
                        {support.deal.id}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Tooltip title={`Click to copy ID`} arrow>
                    <Box
                      onClick={handleCopyId}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          width: '100px',
                          color: 'text.secondary'
                        }}
                      >
                        Trip ID:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary.main"
                      >
                        {support.deal.tripId}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Tooltip title={`Click to copy ID`} arrow>
                    <Box
                      onClick={handleCopyId}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          width: '100px',
                          color: 'text.secondary'
                        }}
                      >
                        Shipment ID:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary.main"
                      >
                        {support.deal.shipmentId}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Stack>
              </Box>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Trip Status
                  </Typography>
                  <Chip
                    label={support.deal.tripStatus.replace(/_/g, ' ')}
                    size="small"
                    sx={{ backgroundColor: '#e3f2fd', color: 'primary.main', textTransform: 'capitalize' }}
                  />
                </Box>

                <Box>
                  <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, sm: 4 }} sx={{ borderRight: { xs: 'none', sm: '1px solid rgba(0, 0, 0, 0.12)' } }}>
                      <Typography variant="body2">Final Reward</Typography>
                      <Typography variant="body2" color="success.main">
                        $ {support.deal.finalReward}
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }} sx={{ borderRight: { xs: 'none', sm: '1px solid rgba(0, 0, 0, 0.12)' } }}>
                      <Typography variant="body2">Service Fees</Typography>
                      <Typography variant="body2" color="success.main">
                        $ {support.deal.fees}
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                      <Typography variant="body2">Payment Fees</Typography>
                      <Typography variant="body2" color="success.main">
                        $ {support.deal.paymentFees}
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Code Confirmation Details
                  </Typography>
                  <Grid container spacing={2}>
                    {[{
                      label: 'Confirm Code',
                      value: support.deal.confirmCode,
                      icon: <span style={{ fontSize: '1.2rem' }}><KeyIcon sx={{ color: 'secondary.main' }} /></span>
                    }, {
                      label: 'Expires At',
                      value: support.deal.confirmCodeExpiresAt
                        ? formatDate(support.deal.confirmCodeExpiresAt) + ' - ' + formatTime(support.deal.confirmCodeExpiresAt)
                        : 'N/A',
                      icon: <span style={{ fontSize: '1.2rem' }}><WatchLaterIcon sx={{ color: 'secondary.main' }} /></span>
                    }, {
                      label: 'Attempts',
                      value: support.deal.confirmCodeAttempts || 'N/A',
                      icon: <span style={{ fontSize: '1.2rem' }}><RecyclingIcon sx={{ color: 'secondary.main' }} /></span>
                    }, {
                      label: 'Last Attempt',
                      value: support.deal.confirmCodeLastAttemptAt
                        ? formatDate(support.deal.confirmCodeLastAttemptAt) + ' - ' + formatTime(support.deal.confirmCodeLastAttemptAt)
                        : 'N/A',
                      icon: <span style={{ fontSize: '1.2rem', }}><WatchLaterIcon sx={{ color: 'secondary.main' }} /></span>
                    }, {
                      label: 'Is Locked',
                      value: support.deal.confirmCodeLocked ? 'Yes' : 'No',
                      icon: <span style={{ fontSize: '1.2rem' }}><LockOpenIcon sx={{ color: 'secondary.main' }} /></span>
                    }, {
                      label: 'Locked Until',
                      value: support.deal.confirmCodeLockedUntil
                        ? formatDate(support.deal.confirmCodeLockedUntil) + ' - ' + formatTime(support.deal.confirmCodeLockedUntil)
                        : 'N/A',
                      icon: <span style={{ fontSize: '1.2rem' }}><WatchLaterIcon sx={{ color: 'secondary.main' }} /></span>
                    }].map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            height: '100%',
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'primary.main',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {item.icon}
                              <Typography variant="body2" color="text.secondary">
                                {item.label}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 500,
                                color: item.label === 'Is Locked'
                                  ? (item.value === 'Yes' ? 'error.main' : 'success.main')
                                  : 'text.primary'
                              }}
                            >
                              {item.value || 'N/A'}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </Paper>
          </motion.div>
        </Stack>
      </Box>

      {/* Status Update Menu */}
      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseUpdateStatusMenu}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 400,
              maxWidth: '90vw',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              border: '1px solid',
              borderColor: 'primary.200'
            }
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary.900" fontWeight="600">
            Update Support Status
          </Typography>
          <Divider sx={{ mb: 3, backgroundColor: 'primary.200' }} />

          <form onSubmit={submitUpdateSupportStatus}>
            <Stack spacing={2.5}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'primary.800' }}>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                  disabled={updateStatusLoading}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.300'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.400'
                    }
                  }}
                >
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="RESOLVED">Resolved</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Admin Response"
                multiline
                rows={4}
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                disabled={updateStatusLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.300'
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.400'
                    }
                  }
                }}
              />

              {updateStatusError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {updateStatusError}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateStatusLoading}
                sx={{
                  py: 1.5,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              >
                {updateStatusLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Update Status'
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Menu>
    </motion.div>
  );
}