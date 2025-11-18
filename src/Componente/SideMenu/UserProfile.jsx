import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { StyledAvatar } from './StyledComponents';
import OptionsMenu from './OptionsMenu';
import { useNavigate } from 'react-router-dom';
const UserProfile = ({ user, loading }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: 2,
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <StyledAvatar onClick={() => navigate("profile")}
        alt={`${user?.name}`}
        src={user?.profilePhoto || '/static/images/avatar/7.jpg'}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            lineHeight: '16px',
            color: 'text.primary',
          }}
        >
          {loading ? <Skeleton variant="text" width={100} height={20} /> : `${user?.firstName} ${user?.lastName}`}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? <Skeleton variant="text" width={100} height={20} /> : user?.email}
        </Typography>
      </Box>
      <OptionsMenu />
    </Box>
  );
};

export default UserProfile; 