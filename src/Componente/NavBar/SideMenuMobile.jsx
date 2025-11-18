import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuButton from '../SideMenu/MenuButton';
import MenuContent from '../SideMenu/MenuContent';
import Logo from '../SideMenu/Logo';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRight: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.2)",
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: "2px solid",
  borderColor: theme.palette.primary.main,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "10px 20px",
  fontWeight: 600,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
}));

function SideMenuMobile({ open, toggleDrawer }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token && refreshToken) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        display: { xs: "block", md: "none" },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            mt: "calc(var(--template-frame-height, 0px) + 4px)",
            p: 2,
          }}
        >
          <Logo />
        </Box>
        <Divider
          sx={{
            borderColor: "rgba(0, 0, 0, 0.1)",
            mx: 2,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MenuContent />
          </Box>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <StyledAvatar
                alt={`${user?.firstName} ${user?.lastName}`}
                src={user?.profilePhoto || "/static/images/avatar/7.jpg"}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Stack>
            <StyledButton
              variant="outlined"
              fullWidth
              startIcon={<LogoutRoundedIcon />}
              sx={{
                color: "error.main",
                borderColor: "error.main",
                "&:hover": {
                  backgroundColor: "error.main",
                  color: "white",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </StyledButton>
          </Box>
        </Box>
      </motion.div>
    </StyledDrawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;