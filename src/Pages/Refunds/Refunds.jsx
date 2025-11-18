import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRefunds } from '../../redux/Slices/refundSlice';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, CircularProgress, Alert, Chip, Button, Pagination } from '@mui/material';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { fadeIn } from '../../Utils/motion';
import IdCell from '../../Componente/TableCells/IdCell';
import MoneyCell from '../../Componente/TableCells/MoneyCell';
import { useNavigate } from 'react-router-dom';
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '100%',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'white',
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
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

const tableHeaders = [
  { label: 'ID', icon: null },
  { label: 'Payment Intent', icon: <CreditCardIcon sx={{ fontSize: "1rem", color: "white" }} /> },
  { label: 'Amount', icon: <PaymentIcon sx={{ fontSize: "1rem", color: "white" }} /> },
  { label: 'Reason', icon: <DescriptionIcon sx={{ fontSize: "1rem", color: "white" }} /> },
  { label: 'Status', icon: <CheckCircleIcon sx={{ fontSize: "1rem", color: "white" }} /> },
];

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'succeeded':
      return 'success';
    case 'pending':
      return 'warning';
    case 'failed':
      return 'error';
    default:
      return 'default';
  }
};


export default function Refunds() {
  const dispatch = useDispatch();
  const { refunds, loading, error, hasMore } = useSelector((state) => state.refund);
  const [startingAfter, setStartingAfter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRefunds(startingAfter));
  }, [startingAfter, dispatch]);

  const handleClick = (id) => {
    navigate(`/landingPage/refunds/${id}`);
  };

  const handlePageChange = (event, page) => {
    if (page === 1) {
      setStartingAfter(null);
    } else if (refunds.length > 0) {
      // Use the last refund's ID as the cursor for the next page
      setStartingAfter(refunds[refunds.length - 1].id);
    }
  };

  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5, 1)}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Refunds</h1>
      </div>
      <Box sx={{ 
        p: { xs: 2, sm: 3 },
        width: '100%',
        maxWidth: '100%',
        overflow: 'auto'
      }}>
        <ToastContainer />
        <StyledTableContainer>
          <Table size="medium" sx={{ width: '100%' }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                {tableHeaders.map((header, index) => (
                  <StyledTableCell key={index} sx={{ 
                    width: index === 0 ? '10%' : 
                           index === 1 ? '20%' : 
                           index === 3 ? '35%' : '15%' 
                  }}>
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
              {loading ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                      <CircularProgress />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ) : error ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                      <Alert severity="error">
                        {error || 'An error occurred while fetching data'}
                      </Alert>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ) : refunds?.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    <Box display="flex" flexDirection="column" alignItems="center" py={4}>
                      <Typography color="text.secondary">
                        No refunds found
                      </Typography>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                refunds?.map((refund) => (
                  <StyledTableRow key={refund.id} onClick={() => handleClick(refund.id)}>
                    <IdCell id={refund.id} />
                    <StyledTableCell>
                      {refund.payment_intent || 'N/A'}
                    </StyledTableCell>
                    <MoneyCell amount={refund.amount} />
                    <StyledTableCell>
                      {refund.reason || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        label={refund.status || 'N/A'}
                        color={getStatusColor(refund.status)}
                        size="small"
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500,
                          minWidth: '80px'
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 2,
          p: 2
        }}>
          <Pagination
            count={hasMore ? 5 : 1}
            page={startingAfter ? 2 : 1}
            color="primary"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </motion.div>
  );
}
