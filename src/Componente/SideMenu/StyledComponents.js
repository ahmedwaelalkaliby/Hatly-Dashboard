import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";

export const drawerWidth = 280;

export const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
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

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
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