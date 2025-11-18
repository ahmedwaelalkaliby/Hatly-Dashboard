import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axiosInstance from "../../Utils/axiosInstance";
import { fadeIn } from "../../Utils/motion";
import DateCell from "../../Componente/TableCells/DateCell";

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "RESOLVED":
      return "success";
    case "REJECTED":
      return "error";
    case "PENDING":
      return "warning";
    default:
      return "default";
  }
};

const getStatusIcon = (status) => {
  switch (status?.toUpperCase()) {
    case "RESOLVED":
      return <CheckCircleIcon />;
    case "REJECTED":
      return <CancelIcon />;
    default:
      return null;
  }
};

export default function FeedbackDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchFeedbackDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/feedback/${id}`);
      setFeedback(response.data.feedback);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch feedback details");
      toast.error(err.response?.data?.message || "Failed to fetch feedback details");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      const response = await axiosInstance.patch(`/feedback/${id}/status`, {
        status: newStatus,
      });
      setFeedback(response.data.feedback);
      toast.success(`Feedback status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update feedback status");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchFeedbackDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!feedback) {
    return null;
  }

  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5, 1)}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ display: 'inline' }}>
          Feedback Details
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Stack direction="row" spacing={2}>
                <Chip
                  label={feedback.status || "PENDING"}
                  color={getStatusColor(feedback.status)}
                  icon={getStatusIcon(feedback.status)}
                />
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => updateStatus("RESOLVED")}
                  disabled={updating || feedback.status === "RESOLVED"}
                >
                  Resolve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => updateStatus("REJECTED")}
                  disabled={updating || feedback.status === "REJECTED"}
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {feedback.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Created At
            </Typography>
            <Box sx={{ mt: 1 }}>
              <DateCell date={feedback.createdAt} />
            </Box>
          </Grid>

          {feedback.images && feedback.images.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                Images
              </Typography>
              <Grid container spacing={2}>
                {feedback.images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      component="img"
                      src={image}
                      alt={`Feedback image ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.9,
                        },
                      }}
                      onClick={() => window.open(image, '_blank')}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </motion.div>
  );
} 