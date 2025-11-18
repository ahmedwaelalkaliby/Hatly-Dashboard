import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { StyledTableCell } from './TableStyles';

export default function SupportTypeCell({ type }) {
  const getTypeConfig = (type) => {
    const configs = {
      SHIPMENT_DAMAGED: {
        label: 'Shipment Damaged',
        color: '#f44336',
        bgColor: 'rgba(244, 67, 54, 0.1)'
      },
      TRIP_CANCELLED: {
        label: 'Trip Cancelled',
        color: '#FF9800',
        bgColor: 'rgba(255, 152, 0, 0.1)'
      },
      SHOPPER_DID_NOT_COME: {
        label: 'Shopper No-Show',
        color: '#E91E63',
        bgColor: 'rgba(233, 30, 99, 0.1)'
      },
      TRAVELLER_DID_NOT_COME: {
        label: 'Traveler No-Show',
        color: '#9C27B0',
        bgColor: 'rgba(156, 39, 176, 0.1)'
      }
    };

    return configs[type] || {
      label: type,
      color: '#607D8B',
      bgColor: 'rgba(96, 125, 139, 0.1)'
    };
  };

  const typeConfig = getTypeConfig(type);

  return (
    <StyledTableCell sx={{ maxWidth: '160px', minWidth: '160px' }}>
      <Tooltip title={typeConfig.label} arrow placement="top">
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            borderRadius: '6px',
            backgroundColor: typeConfig.bgColor,
            border: `1px solid ${typeConfig.bgColor}`,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: `${typeConfig.bgColor.replace('0.1', '0.2')}`,
            }
          }}
        >
          <Typography 
            variant="body2" 
            fontWeight={600}
            sx={{ 
              color: typeConfig.color,
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '140px'
            }}
          >
            {typeConfig.label}
          </Typography>
        </Box>
      </Tooltip>
    </StyledTableCell>
  );
}
