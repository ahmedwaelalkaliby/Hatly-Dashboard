import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChangeLog, getReportDetails, getShipmentChangeLog, updateReportStatus } from "../../redux/Slices/ReportDetailsSlice";
import Loading from "../../Componente/Loading/Loading";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScaleIcon from "@mui/icons-material/Scale";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  "& .MuiInputBase-input": {
    color: "black",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  "& .MuiInputLabel-root": {
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

const ChangeLogItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  background: "rgba(33, 150, 243, 0.05)",
  marginBottom: theme.spacing(2),
}));

const ObjectDisplay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.8)",
  marginTop: theme.spacing(1),
  border: "1px solid rgba(0, 0, 0, 0.1)",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
  },
}));

const ChangeLogTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  '& .change-item': {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: '8px',
    background: 'rgba(33, 150, 243, 0.05)',
  },
  '& .change-header': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  '& .change-content': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

export default function ReportDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportDetails, reportDetailsLoading, reportDetailsError, success, updateReportStatusSuccess, changeLogs, changeLogsLoading, changeLogsError } =
    useSelector((state) => state.reportDetails);
    console.log(reportDetails,"reportDetails");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getReportDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (reportDetails?.shipment?.id) {
      dispatch(getShipmentChangeLog(reportDetails?.shipment?.id));
    }
  }, [reportDetails?.shipment?.id]);

  useEffect(() => {
    if (reportDetailsError) {
      toast.error(reportDetailsError);
    }
    
  }, [reportDetailsError, success]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const handleApprove = () => {
    console.log("approve report", id);
    const status = "approved";
    dispatch(updateReportStatus({ id, status }));
    handleClose();

  };
  const handleReject = () => {
    console.log("reject report", id);
    const status = "cancelled";
    dispatch(updateReportStatus({ id, status }));
    console.log("Report rejected successfully");
    handleClose();

  };

  if (reportDetailsLoading) return <Loading />;
  if (!reportDetails) return <div>No report found</div>;

  const statusColor =
    {
      under_review: "warning",
      resolved: "success",
      rejected: "error",
      pending: "info",
    }[reportDetails.status] || "default";

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  const handleLogClick = (logId) => {
    console.log("logId", logId);
    navigate(`/landingPage/change-log/${logId}` );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: "100%",
          margin: 0,
        }}
      >
        <ToastContainer />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Report Details
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <StatusChip
              label={typeof reportDetails.status === 'string' ? reportDetails.status.replace("_", " ") : 'unknown'}
              color={statusColor}
              variant="outlined"
              size="medium"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                px: 3,
                py: 1,
              }}
            >
              Actions
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleApprove} sx={{ color: 'success.main' }}>
                Approve
              </MenuItem>
              <MenuItem onClick={handleReject} sx={{ color: 'error.main' }}>
                Reject
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <StyledCard sx={{ mb: 4, width: "100%" }}>
          <CardContent>
            <SectionTitle variant="h6">
              <ConfirmationNumberIcon />
              Report Information
            </SectionTitle>
            <Stack spacing={3} width="100%">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                width="100%"
              >
                <StyledTextField
                  fullWidth
                  label="Report ID"
                  variant="outlined"
                  value={reportDetails.id}
                  disabled
                />
                <StyledTextField
                  fullWidth
                  label="Report Type"
                  variant="outlined"
                  value={reportDetails.type ? reportDetails.type.replace("_", " ") : 'N/A'}
                  disabled
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                width="100%"
              >
                <StyledTextField
                  fullWidth
                  label="Created At"
                  variant="outlined"
                  value={formatDate(reportDetails.createdAt)}
                  disabled
                />
                <StyledTextField
                  fullWidth
                  label="Updated At"
                  variant="outlined"
                  value={formatDate(reportDetails.updatedAt)}
                  disabled
                />
              </Stack>
              <StyledTextField
                fullWidth
                label="Description"
                variant="outlined"
                value={reportDetails.description}
                multiline
                rows={4}
                disabled
              />
            </Stack>
          </CardContent>
        </StyledCard>

        <StyledCard sx={{ mb: 4, width: "100%" }}>
          <CardContent>
            <SectionTitle variant="h6">
              <PersonOutlineIcon />
              Reporter Information
            </SectionTitle>
            <Stack spacing={3} width="100%">
              <InfoSection sx={{ width: "100%" }}>
                {reportDetails.createdBy?.profilePhoto ? (
                  <Box
                    component="img"
                    src={reportDetails.createdBy.profilePhoto}
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
                    {`${reportDetails.createdBy?.firstName || ""} ${
                      reportDetails.createdBy?.lastName || ""
                    }`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reportDetails.createdBy?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Role: {reportDetails.createdBy?.role}
                  </Typography>
                </Stack>
              </InfoSection>
            </Stack>
          </CardContent>
        </StyledCard>

        <StyledCard sx={{ mb: 4, width: "100%" }}>
          <CardContent>
            <SectionTitle variant="h6">
              <LocalShippingIcon />
              Shipment Information
            </SectionTitle>
            {reportDetails.shipment ? (
              <Stack spacing={3} width="100%">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  width="100%"
                >
                  <StyledTextField
                    fullWidth
                    label="Shipment ID"
                    variant="outlined"
                    value={reportDetails.shipment.id}
                    disabled
                  />
                  <StyledTextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={reportDetails.shipment.title}
                    disabled
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  width="100%"
                >
                  <StyledTextField
                    fullWidth
                    label="From"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <LocationOnIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    value={`${reportDetails.shipment.fromCity}, ${reportDetails.shipment.from}`}
                    disabled
                  />
                  <StyledTextField
                    fullWidth
                    label="To"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <LocationOnIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    value={`${reportDetails.shipment.toCity}, ${reportDetails.shipment.to}`}
                    disabled
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  width="100%"
                >
                  <StyledTextField
                    fullWidth
                    label="Expected Date"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <EventNoteIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    value={reportDetails.shipment.expectedDate}
                    disabled
                  />
                  <StyledTextField
                    fullWidth
                    label="Weight"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <ScaleIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    value={`${reportDetails.shipment.weight} kg`}
                    disabled
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  width="100%"
                >
                  <StyledTextField
                    fullWidth
                    label="Reward"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <AttachMoneyIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    value={reportDetails.shipment.reward}
                    disabled
                  />
                  <StyledTextField
                    fullWidth
                    label="Total Price"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <AttachMoneyIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    value={reportDetails.shipment.totalPrice}
                    disabled
                  />
                </Stack>
              </Stack>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No shipment information available
              </Typography>
            )}
          </CardContent>
        </StyledCard>

        <StyledCard sx={{ mb: 4, width: "100%" }}>
          <CardContent>
            <SectionTitle variant="h6">
              <EventNoteIcon />
              Shipment Change Logs
            </SectionTitle>
            {changeLogsLoading ? (
              <Loading />
            ) : changeLogsError ? (
              <Typography color="error">{changeLogsError}</Typography>
            ) : changeLogs && changeLogs.length > 0 ? (
              <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Changes</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {changeLogs.map((log, index) => (
                      <StyledTableRow key={log.id} onClick={() => handleLogClick(log.id)}>
                        <ChangeLogTableCell>
                          {log.id}
                        </ChangeLogTableCell>
                        <ChangeLogTableCell>
                          <Box>
                            {log.newData && Object.keys(log.newData).length > 0 && (
                              <Box className="change-item">
                                <Box className="change-header">
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    New Data
                                  </Typography>
                                </Box>
                                <Box className="change-content">
                                  {Object.entries(log.newData).map(([key, value]) => (
                                    <Box key={key} sx={{ display: 'flex', gap: 1 }}>
                                      <Typography component="span" fontWeight="bold">
                                        {key}:
                                      </Typography>
                                      <Typography component="span">
                                        {typeof value === 'object' ? JSON.stringify(value) : value}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            )}

                            {log.report && Object.keys(log.report).length > 0 && (
                              <Box className="change-item">
                                <Box className="change-header">
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    Report Changes
                                  </Typography>
                                </Box>
                                <Box className="change-content">
                                  {Object.entries(log.report)
                                    .filter(([key]) => ['status', 'shipmentId', 'type'].includes(key))
                                    .map(([key, value]) => (
                                      <Box key={key} sx={{ display: 'flex', gap: 1 }}>
                                        <Typography component="span" fontWeight="bold">
                                          {key}:
                                        </Typography>
                                        <Typography component="span">
                                          {value}
                                        </Typography>
                                      </Box>
                                    ))}
                                </Box>
                              </Box>
                            )}

                            {log.shipment && Object.keys(log.shipment).length > 0 && (
                              <Box className="change-item">
                                <Box className="change-header">
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    Shipment Changes
                                  </Typography>
                                </Box>
                                <Box className="change-content">
                                  {Object.entries(log.shipment).map(([key, value]) => (
                                    <Box key={key} sx={{ display: 'flex', gap: 1 }}>
                                      <Typography component="span" fontWeight="bold">
                                        {key}:
                                      </Typography>
                                      <Typography component="span">
                                        {typeof value === 'object' ? JSON.stringify(value) : value}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </Box>
                        </ChangeLogTableCell>
                        <ChangeLogTableCell>
                          <Chip
                            label={log.status}
                            color={
                              log.status === 'approved' ? 'success' :
                              log.status === 'rejected' ? 'error' :
                              log.status === 'pending' ? 'warning' : 'default'
                            }
                            size="small"
                          />
                        </ChangeLogTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No change logs available for this shipment
              </Typography>
            )}
          </CardContent>
        </StyledCard>
      </Box>
    </motion.div>
  );
}
