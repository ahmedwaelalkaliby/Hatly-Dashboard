import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRefundDetails } from '../../../redux/Slices/refunDetalsSlice';
import { Box, Typography, CircularProgress, Alert, Paper, Stack, Grid, Chip, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../Utils/motion';
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatDate } from '../../../Utils/utilFunctions';
import { toast } from 'react-toastify';
import SettingsIcon from '@mui/icons-material/Settings';
import UpdateIcon from '@mui/icons-material/Update';
import MasterCard from '../../../Componente/internals/MasterCard';

const getStatusColor = (status) => {
  switch (status) {
    case true:
      return 'success';
    case false:
      return 'warning';
    default:
      return 'default';
  }
};

const StatCard = ({ title, value, icon, color = 'primary' }) => (
  <Paper
    elevation={1}
    sx={{
      p: 2,
      borderRadius: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <Box sx={{ color: `${color}.main`, mb: 1 }}>{icon}</Box>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 600, color: `${color}.main` }}>
      {value}
    </Typography>
  </Paper>
);

export default function RefundDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refundDetails, loading, error } = useSelector((state) => state.refundDetails);

  useEffect(() => {
    dispatch(getRefundDetails(id));
  }, [dispatch, id]);

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
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

  if (!refundDetails) {
    return null;
  }

  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5, 1)}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={() => navigate(-1)} sx={{ color: 'primary.main' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Refund Details
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Chip
              label={refundDetails.status ? 'Completed' : 'Pending'}
              color={getStatusColor(refundDetails.status)}
              size="medium"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
                minWidth: '100px'
              }}
            />
            <Button
              variant="outlined"
              startIcon={<ReceiptIcon />}
              sx={{ textTransform: 'none' }}
            >
              Download Receipt
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Refund Amount"
              value={`$${refundDetails.amount || 0}`}
              icon={<PaymentIcon sx={{ fontSize: 30 }} />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Created Date"
              value={formatDate(refundDetails.created_at)}
              icon={<AccessTimeIcon sx={{ fontSize: 30 }} />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Payment Method"
              value={refundDetails.payment_method || 'N/A'}
              icon={<CreditCardIcon sx={{ fontSize: 30 }} />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Currency"
              value={refundDetails.currency || 'USD'}
              icon={<TimelineIcon sx={{ fontSize: 30 }} />}
              color="secondary"
            />
          </Grid>
        </Grid>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Refund ID
                    </Typography>
                    <Tooltip title="Copy ID">
                      <IconButton size="small" onClick={() => handleCopyToClipboard(refundDetails.id)}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {refundDetails.id}
                  </Typography>
                </Box>

                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Payment Intent
                    </Typography>
                    <Tooltip title="Copy Payment Intent">
                      <IconButton size="small" onClick={() => handleCopyToClipboard(refundDetails.payment_intent)}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {refundDetails.payment_intent || 'N/A'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Reason
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {refundDetails.reason || 'N/A'}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Payment Status
                  </Typography>
                  <Chip
                    label={refundDetails.status ? 'Completed' : 'Pending'}
                    color={getStatusColor(refundDetails.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Metadata
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      maxHeight: 150,
                      overflow: 'auto'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {refundDetails.metadata && Object.keys(refundDetails.metadata).length > 0
                        ? JSON.stringify(refundDetails.metadata, null, 2)
                        : 'No data available'}
                    </Typography>
                  </Paper>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <TimelineIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Refund Timeline
            </Typography>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Refund Initiated
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(refundDetails.created_at)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color={refundDetails.status ? "success" : "disabled"} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Refund {refundDetails.status ? 'Completed' : 'Processing'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {refundDetails.status ? 'done' : 'In Progress'}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <LocationOnIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Destination Details
            </Typography>
          </Stack>

          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={6}>
              <motion.div
                variants={fadeIn("left", "spring", 0.2, 1)}
                initial="hidden"
                animate="show"
              >
                <Stack spacing={2}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <SettingsIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Type Information
                      </Typography>
                    </Stack>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Transaction Type
                      </Typography>
                      <Chip
                        label={refundDetails.destination_details?.type || 'N/A'}
                        color="primary"
                        size="medium"
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500,
                          px: 1,
                          py: 1.5,
                          fontSize: '0.9rem'
                        }}
                      />
                    </Box>
                  </Paper>
                </Stack>
              </motion.div>
            </Grid>

            {/* <Grid item xs={12} md={6}>
              <motion.div
                variants={fadeIn("right", "spring", 0.4, 1)}
                initial="hidden"
                animate="show"
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <CreditCardIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Card Reference
                    </Typography>
                  </Stack>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Reference Number
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: 'background.paper',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant="body1" sx={{
                          fontWeight: 500,
                          fontFamily: 'monospace',
                          letterSpacing: '0.5px'
                        }}>
                          {refundDetails.destination_details?.card?.reference || 'N/A'}
                        </Typography>
                        <Tooltip title="Copy Reference">
                          <IconButton
                            size="small"
                            onClick={() => handleCopyToClipboard(refundDetails.destination_details?.card?.reference)}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'primary.main'
                              }
                            }}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Reference Status
                      </Typography>
                      <Chip
                        label={refundDetails.destination_details?.card?.reference_status || 'N/A'}
                        color={refundDetails.destination_details?.card?.reference_status === 'available' ? 'success' : 'default'}
                        size="medium"
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500,
                          px: 1,
                          py: 1.5,
                          fontSize: '0.9rem'
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Reference Type
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: 'background.paper'
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {refundDetails.destination_details?.card?.reference_type?.replace(/_/g, ' ') || 'N/A'}
                        </Typography>
                      </Paper>
                    </Box>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid> */}
              <Grid item xs={12} md={6} >
            <motion.div
              variants={fadeIn("right", "spring", 0.4, 1)}
              initial="hidden"
              animate="show"
            >
                <MasterCard
                  number={refundDetails.destination_details?.card?.reference || '0000000000000000'}
                  holder={refundDetails.destination_details?.card?.reference_type?.replace(/_/g, ' ') || 'N/A'}
                  expires={refundDetails.destination_details?.card?.reference_status || 'N/A'}
                  color="dark"
                />
            </motion.div>
              </Grid>
          </Grid>
        </Paper>
      </Box>
    </motion.div>
  );
}
