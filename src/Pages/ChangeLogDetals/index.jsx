import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getChangeLog, updateChangeLogStatus } from '../../redux/Slices/ReportDetailsSlice';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  Paper,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Avatar,
  LinearProgress,
  Menu,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InventoryIcon from '@mui/icons-material/Inventory';
import WeightIcon from '@mui/icons-material/FitnessCenter';
import PriceIcon from '@mui/icons-material/AttachMoney';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Load the English locale for country names
countries.registerLocale(enLocale);

// Function to get the full country name
const getCountryName = (code) => {
  return countries.getName(code, 'en') || code; // Return the country name or the code if not found
};

import { formatDate } from '../../Utils/utilFunctions';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.2)',
    transform: 'translateY(-2px)',
  },
}));

const ChangeLogItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  background: 'rgba(33, 150, 243, 0.05)',
  marginBottom: theme.spacing(2),
  border: '1px solid rgba(33, 150, 243, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(33, 150, 243, 0.08)',
    transform: 'translateX(4px)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontSize: '1.25rem',
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  borderRadius: '20px',
  padding: '8px 16px',
  fontWeight: 600,
  fontSize: '0.875rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  ...(status === 'approved' && {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4CAF50',
  }),
  ...(status === 'rejected' && {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    color: '#F44336',
  }),
  ...(status === 'pending' && {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    color: '#FF9800',
  }),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: 'rgba(33, 150, 243, 0.05)',
  border: '1px solid rgba(33, 150, 243, 0.1)',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(33, 150, 243, 0.08)',
  },
}));

const DataSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  background: 'rgba(33, 150, 243, 0.05)',
  border: '1px solid rgba(33, 150, 243, 0.1)',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(33, 150, 243, 0.08)',
    transform: 'translateY(-2px)',
  },
}));

const fieldIcons = {
  firstName: <PersonIcon color="primary" />,
  lastName: <PersonIcon color="primary" />,
  email: <EmailIcon color="primary" />,
  phone: <PhoneIcon color="primary" />,
  name: <InventoryIcon color="success" />,
  quantity: <InventoryIcon color="success" />,
  weight: <WeightIcon color="success" />,
  price: <PriceIcon color="success" />,
};

const getFieldIcon = (field) => fieldIcons[field] || <InfoIcon color="action" />;

const DataItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.8)',
  marginBottom: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateX(4px)',
  },
}));

// Enhance the user object
const enhanceUserObject = (user) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    isAdmin: user.role === 'admin',
    getContactInfo: () => ({
      email: user.email,
      phone: user.phone,
    }),
  };
};

// Example usage
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  role: 'admin',
};

const enhancedUser = enhanceUserObject(user);

console.log(enhancedUser.fullName); // Output: John Doe
console.log(enhancedUser.isAdmin); // Output: true
console.log(enhancedUser.getContactInfo()); // Output: { email: 'john.doe@example.com', phone: '123-456-7890' }

export default function ChangeLogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { changeLogDetails, changeLogDetailsLoading, changeLogDetailsError, updateChangeLogStatusSuccess } = useSelector((state) => state.reportDetails);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    dispatch(updateChangeLogStatus({ id, status: action }));
    handleMenuClose();
  };

  useEffect(() => {
    dispatch(getChangeLog(id));
  }, [id, dispatch, updateChangeLogStatusSuccess]);

  if (changeLogDetailsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Stack spacing={2} alignItems="center">
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" color="text.secondary">
            Loading Change Log Details...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (changeLogDetailsError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Stack spacing={2} alignItems="center">
          <CancelIcon color="error" sx={{ fontSize: 60 }} />
          <Typography variant="h6" color="error">
            {changeLogDetailsError}
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (!changeLogDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Stack spacing={2} alignItems="center">
          <InfoIcon color="action" sx={{ fontSize: 60 }} />
          <Typography variant="h6" color="text.secondary">
            No change log details found
          </Typography>
        </Stack>
      </Box>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon sx={{ color: '#4CAF50' }} />;
      case 'rejected':
        return <CancelIcon sx={{ color: '#F44336' }} />;
      case 'pending':
        return <PendingIcon sx={{ color: '#FF9800' }} />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%' }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 }, width: '100%', maxWidth: '100%', margin: 0 }}>
        {/* Change Log ID Section */}
       
        {/* Title and Actions */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Go back">
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.2)' },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Change Log Details
            </Typography>
            <StatusChip
              icon={getStatusIcon(changeLogDetails.status)}
              label={changeLogDetails.status}
              status={changeLogDetails.status}
              variant="outlined"
              size="medium"
            />
          </Stack>

          <Box>
            <Button
              variant="contained"
              color="primary"
              endIcon={<MoreVertIcon />}
              onClick={handleMenuClick}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                },
              }}
            >
              Actions
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  minWidth: '180px',
                },
              }}
            >
              <MenuItem
                onClick={() => handleAction('accepted')}
                sx={{
                  color: 'success.main',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.08)',
                  },
                }}
              >
                <CheckCircleIcon sx={{ mr: 1 }} />
                Accept
              </MenuItem>
              <MenuItem
                onClick={() => handleAction('rejected')}
                sx={{
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                  },
                }}
              >
                <CancelIcon sx={{ mr: 1 }} />
                Reject
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
        <Box mb={4}>
          <StyledCard>
            <CardContent>
              <Stack spacing={3}>
                <InfoBox>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main' }}>#</Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Change Log ID
                      </Typography>
                      <Typography variant="h6">{changeLogDetails.id}</Typography>
                    </Box>
                  </Stack>
                </InfoBox>
              </Stack>
            </CardContent>
          </StyledCard>
        </Box>

        {/* Rest of the content */}
        <Grid container spacing={3}>
          {/* Shipment Details Table */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <SectionTitle variant="h6">
                  <LocalShippingIcon sx={{ fontSize: 28 }} />
                  Shipment Details
                </SectionTitle>
                {changeLogDetails.shipment && Object.keys(changeLogDetails.shipment).length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><Typography variant="subtitle2" fontWeight="bold">Field</Typography></TableCell>
                          <TableCell><Typography variant="subtitle2" fontWeight="bold">Value</Typography></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(changeLogDetails.shipment)
                          .filter(([key]) => !['createdAt', 'updatedAt', 'note'].includes(key))
                          .map(([key, value], index) => (
                            <TableRow
                              key={key}
                              sx={{
                                backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                                '&:hover': {
                                  backgroundColor: 'rgba(33, 150, 243, 0.05)',
                                },
                              }}
                            >
                              <TableCell
                                sx={{
                                  padding: '12px',
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                }}
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </TableCell>
                              
                              <TableCell
                                sx={{
                                  padding: '16px',
                                  fontSize: '0.95rem',
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                  wordBreak: 'break-word',
                                  fontFamily: 'monospace',
                                  backgroundColor: 'rgba(33, 150, 243, 0.05)',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 1.5,
                                }}
                              >
                                {key === 'items' && Array.isArray(value) ? (
                                  <Stack spacing={2}>
                                    {value.map((item, itemIndex) => (
                                      <Box
                                        key={itemIndex}
                                        sx={{
                                          padding: 2,
                                          borderRadius: '8px',
                                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                          border: '1px solid rgba(0, 0, 0, 0.1)',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle2"
                                          fontWeight="600"
                                          gutterBottom
                                          sx={{ color: 'text.primary' }}
                                        >
                                          {item.name}
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: 0.5,
                                            }}
                                          >
                                            <InventoryIcon sx={{ fontSize: 16 }} />
                                            Quantity: {item.quantity}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: 0.5,
                                            }}
                                          >
                                            <WeightIcon sx={{ fontSize: 16 }} />
                                            Weight: {item.weight}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: 0.5,
                                            }}
                                          >
                                            <PriceIcon sx={{ fontSize: 16 }} />
                                            Price: {item.price}
                                          </Typography>
                                        </Stack>
                                      </Box>
                                    ))}
                                  </Stack>
                                ) : (
                                  typeof value === 'object' && value !== null
                                    ? 
                                    (
                                      //implement user ui in moder way
                                      // i just want show the name and email and photo only
                                      
                                      <Stack spacing={2} direction="row" alignItems="center">
                                        {value.passportPhoto && (
                                          <Avatar
                                            src={value.passportPhoto}
                                            alt={`${value.firstName} ${value.lastName}`}
                                            sx={{
                                              width: 56,
                                              height: 56,
                                              border: '2px solid rgba(33, 150, 243, 0.5)',
                                            }}
                                          />
                                        )}
                                        <Box>
                                          <Typography variant="h6" fontWeight="bold" color="text.primary">
                                            {value.firstName} {value.lastName}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                            {value.email}
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    )
                                    : value
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <Stack spacing={2} alignItems="center">
                      <InfoIcon color="action" sx={{ fontSize: 40 }} />
                      <Typography variant="body1" color="text.secondary">
                        No shipment details available
                      </Typography>
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Updated Data Section */}
          <Grid item xs={12}>
            <StyledCard
              sx={{
                background: 'linear-gradient(135deg, rgba(33,150,243,0.1), rgba(255,255,255,0.9))',
                border: '1px solid rgba(33, 150, 243, 0.2)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(33, 150, 243, 0.2)',
                },
              }}
            >
              <CardContent>
                <SectionTitle variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  <ChangeCircleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                  Updated Data
                </SectionTitle>
                <DataSection
                  sx={{
                    background: 'rgba(33, 150, 243, 0.05)',
                    padding: 3,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      background: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  {changeLogDetails.newData && Object.keys(changeLogDetails.newData).length > 0 ? (
                    Object.entries(changeLogDetails.newData).map(([key, value]) => (
                      <DataItem
                        key={key}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          padding: 2,
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                          '&:hover': {
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: 'success.main',
                            width: 40,
                            height: 40,
                            fontSize: '1rem',
                            fontWeight: 700,
                          }}
                        >
                          {key.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box flex={1}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 0.5, fontWeight: 600 }}
                          >
                            {key}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              backgroundColor: 'rgba(33, 150, 243, 0.05)',
                              padding: 1,
                              borderRadius: 1,
                              fontFamily: 'monospace',
                              wordBreak: 'break-word',
                            }}
                          >
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                          </Typography>
                        </Box>
                      </DataItem>
                    ))
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="200px"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 2,
                        padding: 2,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <Stack spacing={2} alignItems="center">
                        <InfoIcon color="action" sx={{ fontSize: 40 }} />
                        <Typography variant="body1" color="text.secondary">
                          No new data available
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                </DataSection>
              </CardContent>
            </StyledCard>
          </Grid>

         
        </Grid>
      </Box>
    </motion.div>
  );
}
