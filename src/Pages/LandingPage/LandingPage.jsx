import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SideMenu from "../../Componente/SideMenu/SideMenu";
import Navbar from "../../Componente/NavBar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../Componente/Header/Header";
import { Stack } from "@mui/material";

export default function LandingPage() {
  const isLogin = localStorage.getItem("isLoggedIn")
  const navigate = useNavigate()


  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
    }
  }, [isLogin, navigate]);

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto", width: "100%" }}>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet></Outlet>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
