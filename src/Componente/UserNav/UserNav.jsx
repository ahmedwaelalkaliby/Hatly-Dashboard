import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonNavFilter from './ButtonNavFilter';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useNavigate } from 'react-router-dom';

export default function UserNav() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, height: '80px' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            color: 'black',
            backgroundColor: 'white',
            height: '80px',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
            alignItems: { xs: 'flex-start', sm: 'center' }, // Align items properly
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 0 }, // Add spacing for small screens
          }}
        >
          {/* Title */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Adjust font size for small screens
              textAlign: { xs: 'left' }, // Align text for small screens
            }}
          >
            All users
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: {  sm: 'row' }, // Stack buttons vertically on small screens
              gap: { xs: 1, sm: 2 }, // Adjust gap between buttons
              alignItems: 'center',
            }}
          >
            <button
              style={{
                backgroundColor: '#4141DA',
                color: 'white',
                padding: '10px',
                width: '150px',
                borderRadius: '5px',
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => navigate('/landingPage/add-user')}
            >
              <p style={{ margin: 0 }}>Add User</p>
              <PersonAddAltOutlinedIcon />
            </button>
            <ButtonNavFilter />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
