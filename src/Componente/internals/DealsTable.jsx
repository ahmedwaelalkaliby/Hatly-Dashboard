import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Stack,
  Avatar,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { toast } from 'react-toastify';
import { formatDate } from '../../Utils/utilFunctions';
import { useNavigate } from 'react-router-dom';
import FeesCell from '../TableCells/FeesCell';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  '&:hover': {
    backgroundColor: "rgba(0, 0, 0, 0.04) !important",
    transition: 'background-color 0.2s ease',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRight: '1px solid rgba(0, 0, 0, 0.1)',
  verticalAlign: 'middle',
  '&:last-child': {
    borderRight: 'none',
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiTypography-caption': {
    color: theme.palette.text.secondary,
  },
}));

export default function DealsTable({ deals }) {
  const navigate = useNavigate();
  const handleRowClick = (dealId) => {
    navigate(`/landingPage/deals/${dealId}`);
  };
  const tableHeaders = [
    { label: 'ID', icon: null },
    { label: 'Status', icon: null },
    { label: 'Shopper', icon: <PersonIcon sx={{ fontSize: "1rem", color: "white" }} /> },
    { label: 'Traveler', icon: <PersonIcon sx={{ fontSize: "1rem", color: "white" }} /> },
    { label: 'Fees', icon: <PriceChangeIcon sx={{ fontSize: "1rem", color: "white" }} /> },
    { label: 'Dates', icon: <CalendarTodayIcon sx={{ fontSize: "1rem", color: "white" }} /> },
  ];

  return (
    <StyledTableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            {tableHeaders.map((header, index) => (
              <StyledTableCell key={index}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {header.icon}
                  <Typography variant="subtitle2" sx={{ color: 'white !important', fontWeight: 600 }}>
                    {header.label}
                  </Typography>
                </Stack>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {deals?.length > 0 ? (
            deals.map((deal) => (
              <StyledTableRow key={deal.id} hover onClick={() => handleRowClick(deal.id)} sx={{ cursor: 'pointer' }}>
                <StyledTableCell>
                  <Tooltip title="Click to copy ID" arrow>
                    <Typography
                      variant="body2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(deal.id);
                        toast.success("ID copied to clipboard");
                      }}
                      sx={{ 
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        '&:hover': { 
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {deal.id.substring(0, 8)}...
                    </Typography>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 2,
                      py: 0.75,
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      textTransform: 'capitalize',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      ...(deal.dealStatus === 'accepted' && {
                        bgcolor: 'success.lighter',
                        color: 'success.dark',
                      }),
                      ...(deal.dealStatus === 'rejected' && {
                        bgcolor: 'error.lighter',
                        color: 'error.dark',
                      }),
                      ...(deal.dealStatus === 'pending' && {
                        bgcolor: 'warning.lighter',
                        color: 'warning.dark',
                      })
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      deal.dealStatus === 'accepted' ? 'bg-green-600' :
                      deal.dealStatus === 'rejected' ? 'bg-red-600' :
                      'bg-yellow-600'
                    }`} />
                    {deal.dealStatus || 'N/A'}
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {deal.shopper?.profilePhoto ? (
                      <Avatar
                        src={deal.shopper.profilePhoto}
                        alt={deal.shopper.firstName}
                        sx={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                        {deal.shopper?.firstName?.[0]}
                      </Avatar>
                    )}
                    <Stack>
                      <Typography variant="body2" fontWeight="medium">
                        {`${deal.shopper?.firstName} ${deal.shopper?.lastName}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Creator: {deal.creatorEmail}
                      </Typography>
                    </Stack>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {deal.traveler?.profilePhoto ? (
                      <Avatar
                        src={deal.traveler.profilePhoto}
                        alt={deal.traveler.firstName}
                        sx={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light' }}>
                        {deal.traveler?.firstName?.[0]}
                      </Avatar>
                    )}
                    <Typography variant="body2" fontWeight="medium">
                      {`${deal.traveler?.firstName} ${deal.traveler?.lastName}`}
                    </Typography>
                  </Stack>
                </StyledTableCell>
                <FeesCell {...deal} />
                <StyledTableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <FlightTakeoffIcon sx={{ width: 16, height: 16 }} />
                      <Typography variant="caption">
                        Depart: {formatDate(deal.trip?.departDate)}
                      </Typography>
                    </Stack>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={8}>
                <Box py={6} textAlign="center">
                  <TaskAltIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>No Deals Available</Typography>
                  <Typography variant="body2" color="text.disabled">No deals have been created yet</Typography>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}