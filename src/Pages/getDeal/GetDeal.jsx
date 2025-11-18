import React, { useEffect } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Loading from "../../Componente/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getDealDetails } from "../../redux/Slices/getDealSlice";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.2)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiInputBase-input': {
    color: 'black',
    fontWeight: "bold",
    fontSize: "1rem",
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
}));

const InfoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: "12px",
  background: "rgba(33, 150, 243, 0.05)",
  marginBottom: theme.spacing(2),
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: "20px",
  padding: "8px 16px",
  fontWeight: 600,
  fontSize: "0.875rem",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export default function GetDeal() {
  const { dealId } = useParams();
  const dispatch = useDispatch();
  const { deal, dealLoading, dealError, success } = useSelector(
    (state) => state.getDeal
  );

  useEffect(() => {
    dispatch(getDealDetails(dealId));
  }, [dealId, dispatch]);

  useEffect(() => {
    if (dealError) {
      toast.error(dealError);
    }
    if (success) {
      toast.success("Deal loaded successfully");
    }
  }, [dealError, success]);

  if (dealLoading) return <Loading />;
  if (!deal) return <div>No deal found</div>;

  const statusColor = {
    pending: "warning",
    accepted: "success",
    rejected: "error",
    completed: "primary",
  }[deal.dealStatus] || "default";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%' }}
    >
      <Box sx={{ 
        p: { xs: 2, sm: 3 },
        width: '100%',
        maxWidth: '100%',
        margin: 0
      }}>
        <ToastContainer />
        
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4} width="100%">
          <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
            Deal Details
          </Typography>
          <StatusChip
            label={deal.dealStatus}
            color={statusColor}
            variant="outlined"
            size="medium"
          />
        </Stack>

        <StyledCard sx={{ mb: 4, width: '100%' }}>
          <CardContent>
            <SectionTitle variant="h6">
              <AttachMoneyIcon />
              Financial Information
            </SectionTitle>
            <Stack spacing={3} width="100%">
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3} width="100%">
                <StyledTextField
                  fullWidth
                  label="Counter Reward"
                  variant="outlined"
                  value={`$${deal.counterReward}`}
                  disabled
                />
                <StyledTextField
                  fullWidth
                  label="Final Reward"
                  variant="outlined"
                  value={`$${deal.finalReward}`}
                  disabled
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3} width="100%">
                <StyledTextField
                  fullWidth
                  label="Fees"
                  variant="outlined"
                  value={`$${deal.fees}`}
                  disabled
                />
                <StyledTextField
                  fullWidth
                  label="Payment Fees"
                  variant="outlined"
                  value={`$${deal.paymentFees}`}
                  disabled
                />
              </Stack>
            </Stack>
          </CardContent>
        </StyledCard>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4} width="100%">
          <StyledCard sx={{ flex: 1, width: '100%' }}>
            <CardContent>
              <SectionTitle variant="h6">
                <PersonOutlineIcon />
                Shopper Information
              </SectionTitle>
              <Stack spacing={3} width="100%">
                <InfoSection sx={{ width: '100%' }}>
                  {deal.shopper?.profilePhoto ? (
                    <Box
                      component="img"
                      src={deal.shopper.profilePhoto}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <AccountCircleOutlinedIcon sx={{ fontSize: 60 }} />
                  )}
                  <Stack width="100%">
                    <Typography variant="h6" fontWeight={600}>
                      {`${deal.shopper?.firstName || ''} ${deal.shopper?.lastName || ''}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {deal.shopper?.email}
                    </Typography>
                  </Stack>
                </InfoSection>
                <StyledTextField
                  fullWidth
                  label="Creator Email"
                  variant="outlined"
                  value={deal.creatorEmail}
                  disabled
                />
              </Stack>
            </CardContent>
          </StyledCard>

          <StyledCard sx={{ flex: 1, width: '100%' }}>
            <CardContent>
              <SectionTitle variant="h6">
                <PersonOutlineIcon />
                Traveler Information
              </SectionTitle>
              <Stack spacing={3} width="100%">
                <InfoSection sx={{ width: '100%' }}>
                  {deal.traveler?.profilePhoto ? (
                    <Box
                      component="img"
                      src={deal.traveler.profilePhoto}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <AccountCircleOutlinedIcon sx={{ fontSize: 60 }} />
                  )}
                  <Stack width="100%">
                    <Typography variant="h6" fontWeight={600}>
                      {`${deal.traveler?.firstName || ''} ${deal.traveler?.lastName || ''}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {deal.traveler?.email}
                    </Typography>
                  </Stack>
                </InfoSection>
              </Stack>
            </CardContent>
          </StyledCard>
        </Stack>

        <StyledCard sx={{ mb: 4, width: '100%' }}>
          <CardContent>
            <SectionTitle variant="h6">
              <ConfirmationNumberIcon />
              Related IDs
            </SectionTitle>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} width="100%">
              <StyledTextField
                fullWidth
                label="Deal ID"
                variant="outlined"
                value={deal.id}
                disabled
              />
              <StyledTextField
                fullWidth
                label="Trip ID"
                variant="outlined"
                value={deal.tripId}
                disabled
              />
              <StyledTextField
                fullWidth
                label="Shipment ID"
                variant="outlined"
                value={deal.shipmentId}
                disabled
              />
            </Stack>
          </CardContent>
        </StyledCard>

        {deal.shipmentPhoto && (
          <StyledCard sx={{ width: '100%' }}>
            <CardContent>
              <SectionTitle variant="h6">
                <LocalShippingIcon />
                Shipment Photo
              </SectionTitle>
              <Box
                component="img"
                src={deal.shipmentPhoto}
                alt="Shipment"
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                  borderRadius: "12px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              />
            </CardContent>
          </StyledCard>
        )}
      </Box>
    </motion.div>
  );
}
