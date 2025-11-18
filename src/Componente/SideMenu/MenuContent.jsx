import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate, useLocation } from 'react-router-dom';
import BreadCrumbContext from '../../context/BreadCrumbContext';
import FlagIcon from '@mui/icons-material/Flag';
import { useTheme } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FeedbackIcon from '@mui/icons-material/Feedback';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/landingPage/home' },
  { text: 'Trips', icon: <LocalAirportIcon />, path: '/landingPage/trips' },
  { text: 'Shipments', icon: <LocalShippingIcon />, path: '/landingPage/shipments' },
  { text: 'Users', icon: <PeopleAltIcon />, path: '/landingPage/users' },
  { text: 'Deals', icon: <HandshakeIcon />, path: '/landingPage/deals' },
  { text: 'Reports', icon: <FlagIcon />, path: '/landingPage/reports' },
  { text: 'Supports', icon: <AdminPanelSettingsIcon />, path: '/landingPage/supports' },
  { text: 'Refunds', icon: <AutorenewIcon />, path: '/landingPage/refunds' },
  { text: 'Feedback', icon: <FeedbackIcon />, path: '/landingPage/feedback' },
];

export default function MenuContent() {
  const { updateBreadcrumbs } = useContext(BreadCrumbContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleNavigate = (item) => {
    updateBreadcrumbs(item.path, item.text);
    navigate(item.path);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={index} disablePadding sx={{ display: 'block', fontSize: '2rem' }}>
              <ListItemButton 
                selected={isSelected} 
                onClick={() => handleNavigate(item)}
                sx={{ minHeight: 48, px: 2.5}}
                style={{
                  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
                  color: isSelected ? 'white' : 'black',
                  borderRadius: isSelected ? '8px' : '0',
                  transition: 'background-color 0.3s ease-in-out',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                    color: isSelected ? 'white' : theme.palette.text.primary,
                    transition: 'color 0.3s ease-in-out',
                  }}
                >{item.icon}</ListItemIcon>
                <ListItemText
                 primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}