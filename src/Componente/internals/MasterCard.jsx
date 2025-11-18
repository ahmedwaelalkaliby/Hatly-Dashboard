import Card from "@mui/material/Card";
import masterCardLogo from "../../assets/Images/mastercard.png";
import bgImage from "../../assets/Images/map.jpg";
import { Box, Typography, Chip } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';


function MasterCard({ color = "dark", number, holder, expires }) {
  const numbers = [...`${number}`];

  // Pad with zeros if number is less than 16 digits
  while (numbers.length < 16) {
    numbers.unshift('0');
  }

  // Take only first 16 digits if longer
  const validNumbers = numbers.slice(0, 16);

  const num1 = validNumbers.slice(0, 4).join("");
  const num2 = validNumbers.slice(4, 8).join("");
  const num3 = validNumbers.slice(8, 12).join("");
  const num4 = validNumbers.slice(12, 16).join("");

  const gradientColors = {
    dark: {
      from: 'rgba(45, 45, 45, 0.8)',
      to: 'rgba(25, 25, 25, 0.8)'
    },
    primary: {
      from: 'rgba(26, 115, 232, 0.8)',
      to: 'rgba(21, 101, 192, 0.8)'
    },
    info: {
      from: 'rgba(33, 150, 243, 0.8)',
      to: 'rgba(25, 118, 210, 0.8)'
    },
    success: {
      from: 'rgba(76, 175, 80, 0.8)',
      to: 'rgba(56, 142, 60, 0.8)'
    },
    warning: {
      from: 'rgba(251, 140, 0, 0.8)',
      to: 'rgba(245, 124, 0, 0.8)'
    },
    error: {
      from: 'rgba(244, 67, 54, 0.8)',
      to: 'rgba(211, 47, 47, 0.8)'
    }
  };

  const selectedGradient = gradientColors[color] || gradientColors.dark;

  return (
    <Card
      sx={{
        background: `linear-gradient(195deg, ${selectedGradient.from}, ${selectedGradient.to}), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.4)',
        borderRadius: '16px',
      }}
    >
      <Box p={2}>
        <Box color="white" p={1} lineHeight={0} display="inline-block">
        <WifiIcon sx={{ color: 'white' }}/>
        </Box>
        <Typography
          variant="h5"
          color="white"
          fontWeight="medium"
          sx={{ mt: 3, mb: 5, pb: 1 }}
        >
          {num1}&nbsp;&nbsp;&nbsp;{num2}&nbsp;&nbsp;&nbsp;{num3}&nbsp;&nbsp;&nbsp;{num4}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box mr={3} lineHeight={1}>
              <Typography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Reference Type
              </Typography>
              <Typography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
                sx={{ mt: 1 }}
              >
                {holder}
              </Typography>
            </Box>
            <Box lineHeight={1}>
              <Typography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Status
              </Typography>
              <Box mt={1}>
                <Chip 
                  label={expires}
                  color={expires === 'available' ? 'success' : 'default'}
                  size="small"
                  sx={{ 
                    color: 'white',
                    textTransform: 'capitalize',
                    backgroundColor: expires === 'available' ? 'rgba(76, 175, 80, 0.6)' : 'rgba(158, 158, 158, 0.6)'
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" width="20%">
            <Box component="img" src={masterCardLogo} alt="master card" width="60%" mt={1} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default MasterCard;
