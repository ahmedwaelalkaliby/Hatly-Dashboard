import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { zoomIn } from "../../Utils/motion";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import PublicIcon from '@mui/icons-material/Public';

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary[300]})`,
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    // background: theme.palette.primary.main,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "&:hover": {
    // transform: "translateY(-8px)",
    // boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.2)",
    "&::before": {
      height: "6px",
    },
  },
}));

const StyledChip = styled(Chip)(({ theme, trend }) => ({
  borderRadius: "16px",
  padding: "6px 16px",
  fontSize: "0.875rem",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
  ...(trend === 'up' && {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: "#4CAF50",
    "&:hover": {
      backgroundColor: "rgba(76, 175, 80, 0.2)",
    },
  }),
  ...(trend === 'down' && {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    color: "#F44336",
    "&:hover": {
      backgroundColor: "rgba(244, 67, 54, 0.2)",
    },
  }),
  ...(trend === 'neutral' && {
    backgroundColor: "rgba(158, 158, 158, 0.1)",
    color: "#9E9E9E",
    "&:hover": {
      backgroundColor: "rgba(158, 158, 158, 0.2)",
    },
  }),
}));

const StyledValue = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 800,
  background: theme.palette.primary.main,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "12px 0",
  letterSpacing: "-0.5px",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -4,
    left: 0,
    width: "60px",
    height: "3px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary[300]})`,
    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "&:hover::after": {
    width: "100%",
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  position: "relative",
  paddingBottom: "8px",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -4,
    left: 0,
    width: "40px",
    height: "2px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary[300]})`,
    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "&:hover::after": {
    width: "100%",
  },
}));




function StatCard({ 
  title, 
  value, 
  isloading, 
}) {

  return (
    <motion.div
      variants={zoomIn(0.2, 0.6)}
      initial="hidden"
      animate="show"
      style={{ width: "100%" }}
    >
      <StyledCard>
        <CardContent sx={{ p: 3, width: "100%" }}>
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <StyledTitle>{isloading ? <Skeleton variant="text" width={200} height={30} /> : title}</StyledTitle>
              {/* <StyledChip trend={trend} label={trendValues[trend]} /> */}
              <div 
                className={`flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br 
                  ${title === 'Users' ? 'from-primary-500 to-primary-700' : title === 'Trips' ? 'from-pink-500 to-pink-700' : title === 'Shipments' ? 'from-green-500 to-green-700' : 'from-indigo-500 to-indigo-700'}
                  `}
              >
                {title === 'Users' && <PublicIcon  sx={{ width: 30, height: 30, color: 'white' }}/>}
                {title === 'Trips' && <MiscellaneousServicesIcon  sx={{ width: 30, height: 30, color: 'white' }}/>}
                {title === 'Shipments' && <ConnectingAirportsIcon  sx={{ width: 30, height: 30, color: 'white' }}/>}
                {title === 'Deals' && <HandshakeIcon  sx={{ width: 30, height: 30, color: 'white' }}/>} 
              </div>
            </Stack>
            <StyledValue>{(isloading || !value || value === undefined) ? <Skeleton variant="text" width={200} height={40} /> : value}</StyledValue>
          </Stack>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isloading: PropTypes.bool,
};

export default StatCard;
