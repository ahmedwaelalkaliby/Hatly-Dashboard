import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const DealFormModal = ({ open, onClose, onSubmit, loading, error, initialShipmentId = '' }) => {
  const [formData, setFormData] = useState({
    shipmentId: initialShipmentId,
    tripId: '',
    offer: '',
    fees: '',
    paymentFees: ''
  });

  const [errors, setErrors] = useState({
    shipmentId: '',
    tripId: '',
    offer: '',
    fees: '',
    paymentFees: ''
  });

  const validateULID = (ulid) => {
    const trimmed = ulid.trim();
    if (!trimmed) return 'Trip ID is required';
    if (trimmed.length !== 26) return 'Must be exactly 26 characters';
    if (!/^[0-9A-HJ-NP-Z]{26}$/.test(trimmed)) {
      return 'Only numbers and uppercase letters (excluding I, O, U) allowed';
    }
    return '';
  };

  const validateNumber = (value, fieldName) => {
    if (!value) return `${fieldName} is required`;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return `Enter a valid number`; 
    if (numValue <= 0) return `Must be greater than 0`;
    if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Max 2 decimal places';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'tripId') {
      processedValue = value.toUpperCase().replace(/[^0-9A-Z]/g, '');
    } else if (['offer', 'fees', 'paymentFees'].includes(name)) {
      
      if ((value.match(/\./g) || []).length > 1) return;
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';
    
    if (name === 'tripId') {
      error = validateULID(value);
    } else if (['offer', 'fees', 'paymentFees'].includes(name)) {
      error = validateNumber(value, name);
    } else if (!value.trim()) {
      error = `${name.replace(/([A-Z])/g, ' $1')} is required`.trim();
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {
      shipmentId: !formData.shipmentId.trim() ? 'Shipment ID is required' : '',
      tripId: validateULID(formData.tripId),
      offer: validateNumber(formData.offer, 'Offer'),
      fees: validateNumber(formData.fees, 'Fees'),
      paymentFees: validateNumber(formData.paymentFees, 'Payment Fees')
    };

    setErrors(validationErrors);
    if (Object.values(validationErrors).some(err => err)) return;

    onSubmit({
      shipmentId: formData.shipmentId.trim(),
      tripId: formData.tripId.trim(),
      offer: Math.round(parseFloat(formData.offer) * 100),
      fees: Math.round(parseFloat(formData.fees) * 100),
      paymentFees: Math.round(parseFloat(formData.paymentFees) * 100)
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Deal</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Shipment ID</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="shipmentId"
            value={formData.shipmentId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.shipmentId}
            helperText={errors.shipmentId}
            required
          />
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Trip ID (ULID) *</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="tripId"
            value={formData.tripId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.tripId}
            helperText={errors.tripId || "Format: 26 uppercase characters (0-9, A-H, J-N, P-Z)"}
            required
            inputProps={{
              maxLength: 26,
              pattern: "[0-9A-HJ-NP-Z]{26}",
            }}
          />
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Offer Amount ($) *</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="offer"
            type="number"
            value={formData.offer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.offer}
            helperText={errors.offer}
            required
            inputProps={{ 
              step: "0.01", 
              min: "0.01",
              pattern: "^\\d+(\\.\\d{1,2})?$"
            }}
          />
          
          <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>Fees ($) *</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="fees"
            type="number"
            value={formData.fees}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.fees}
            helperText={errors.fees}
            required
            inputProps={{ 
              step: "0.01", 
              min: "0.01",
              pattern: "^\\d+(\\.\\d{1,2})?$"
            }}
          />
          
          <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>Payment Fees ($) *</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="paymentFees"
            type="number"
            value={formData.paymentFees}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.paymentFees}
            helperText={errors.paymentFees}
            required
            inputProps={{ 
              step: "0.01", 
              min: "0.01",
              pattern: "^\\d+(\\.\\d{1,2})?$"
            }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          CANCEL
        </Button>
        <Button 
          type="submit"
          color="primary" 
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{ fontWeight: 'bold' }}
        >
          {loading ? 'Creating...' : 'CREATE DEAL'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DealFormModal;