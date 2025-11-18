import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { StyledTableCell } from './TableStyles';

export default function ReportTypeCell({ type }) {
  const getTypeConfig = (type) => {
    const configs = {
      wrong_info: {
        label: 'Wrong Info',
        color: '#FF9800',
        bgColor: 'rgba(255, 152, 0, 0.1)'
      },
      damaged: {
        label: 'Damaged',
        color: '#f44336',
        bgColor: 'rgba(244, 67, 54, 0.1)'
      },
      missing_item: {
        label: 'Missing Item',
        color: '#E91E63',
        bgColor: 'rgba(233, 30, 99, 0.1)'
      },
      late: {
        label: 'Late',
        color: '#9C27B0',
        bgColor: 'rgba(156, 39, 176, 0.1)'
      },
      other: {
        label: 'Other',
        color: '#607D8B',
        bgColor: 'rgba(96, 125, 139, 0.1)'
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
    <StyledTableCell sx={{ maxWidth: '110px', minWidth: '110px' }}>
      <Tooltip title={typeConfig.label} arrow placement="top">
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1,
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
              maxWidth: '90px'
            }}
          >
            {typeConfig.label}
          </Typography>
        </Box>
      </Tooltip>
    </StyledTableCell>
  );
}