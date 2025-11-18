import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import Search from './Search';
import MenuButton from '../SideMenu/MenuButton';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

const StyledStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  boxShadow: "0 4px 20px 0 rgba(31, 38, 135, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
  },
}));

const StyledSearchStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  "& button": {
    borderRadius: "12px",
    padding: "8px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
}));

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <StyledStack>
        <NavbarBreadcrumbs />
        <StyledSearchStack>
          <Search />
          <MenuButton 
            showBadge
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
            <NotificationsRoundedIcon />
          </MenuButton>
        </StyledSearchStack>
      </StyledStack>
    </motion.div>
  );
}