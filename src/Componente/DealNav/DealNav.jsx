import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DealBtnNavFilter from './DealBtnNavFilter';


export default function DealNav() {
  
 

  return (
    <Box sx={{ flexGrow: 1, height: '80px' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            color: 'black',
            backgroundColor: 'white',
            height: '80px',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              textAlign: { xs: 'left' },
            }}
          >
            All Deals
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { sm: 'row' },
              gap: { xs: 1, sm: 2 },
              alignItems: 'center',
            }}
          >
           
            <DealBtnNavFilter />
          </Box>
        </Toolbar>
      </AppBar>

    
    </Box>
  );
}