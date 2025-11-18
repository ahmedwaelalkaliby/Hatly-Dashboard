import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import { tabsClasses } from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { motion } from 'framer-motion';
import SideMenuMobile from './SideMenuMobile';
import MenuButton from '../SideMenu/MenuButton';
import logoImg from '../../assets/Images/image.png';
// import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  boxShadow: "0 4px 20px 0 rgba(31, 38, 135, 0.1)",
  transition: "all 0.3s ease-in-out",
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
}));

const StyledLogoBox = styled(Box)(({ theme }) => ({
  width: '2.5rem',
  height: '2.5rem',
  background: "white",
  borderRadius: "999px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  color: 'hsla(210, 100%, 95%, 0.9)',
  border: '1px solid',
  borderColor: 'hsl(210, 100%, 55%)',
  boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  "& img": {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: "1.25rem",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Toolbar variant="regular">
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              flexGrow: 1,
              width: '100%',
              gap: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ 
                justifyContent: 'center', 
                mr: 'auto', 
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <StyledLogoBox>
                <img src={logoImg} alt="dashboard-logo" />
              </StyledLogoBox>
              <StyledTitle variant="h5" component="h1">
                Hatly Dashboard
              </StyledTitle>
            </Stack>
            {/* <ColorModeIconDropdown /> */}
            <MenuButton 
              aria-label="menu" 
              onClick={toggleDrawer(true)}
              sx={{
                borderRadius: "12px",
                padding: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <MenuRoundedIcon />
            </MenuButton>
            <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
          </Stack>
        </Toolbar>
      </motion.div>
    </AppBar>
  );
}

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: '2.5rem',
        height: '2.5rem',
        bgcolor: 'white',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
         
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
      }}
    >
     <img src={logoImg} alt="dashboard-logo" width="50" height="50" />
    </Box>
  );
}