import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import BreadCrumbContext from "../../context/BreadCrumbContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  cursor: "default",
  "&:hover": {
    color: theme.palette.text.secondary,
  },
}));

export default function NavbarBreadcrumbs() {
  const { breadcrumbs } = useContext(BreadCrumbContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBreadcrumbClick = (path) => {
    if (path === "/" || path === "/landingPage") {
      navigate("/landingPage/home");
    } else if (path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isDashboard = crumb.path === "/" || crumb.path === "/landingPage/home";
        
        if (isDashboard) {
          return (
            <StyledTypography
              key={crumb.path}
              variant="body1"
              sx={{ 
                color: "text.secondary",
                cursor: "default"
              }}
            >
              {crumb.title}
            </StyledTypography>
          );
        }

        return isLast ? (
          <Typography
            key={crumb.path}
            variant="body1"
            sx={{ 
              color: "text.primary", 
              fontWeight: 600,
              cursor: "default"
            }}
          >
            {crumb.title}
          </Typography>
        ) : (
          crumb.path === "/" ? (
            <StyledTypography
              key={crumb.path}
              variant="body1"
              sx={{ 
                color: "text.secondary",
                cursor: "default"
              }}
            >
              {crumb.title}
            </StyledTypography>
          ) : (
            <StyledLink 
              key={crumb.path} 
              to={crumb.path}
              onClick={(e) => {
                e.preventDefault();
                handleBreadcrumbClick(crumb.path);
              }}
            >
              {crumb.title}
            </StyledLink>
          )
        );
      })}
    </StyledBreadcrumbs>
  );
}
