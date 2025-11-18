import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import Logo from "./Logo";
import MenuContent from "./MenuContent";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/Slices/authSlice";

const drawerWidth = 280;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
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


const SideMenu = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const success = useSelector((state) => state.userDetails.success);
  const dispatch = useDispatch();

  useEffect(() => {
    const user1 = JSON.parse(localStorage.getItem("user"));
    dispatch(getUser(user1?.id));
  }, [success, dispatch]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
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
          <UserProfile user={user} loading={loading} />
        </Box>
      </motion.div>
    </Drawer>
  );
};

export default SideMenu;
