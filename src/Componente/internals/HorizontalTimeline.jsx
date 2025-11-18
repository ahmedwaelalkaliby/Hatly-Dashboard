import React from 'react';
import { Box, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TimelineContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  padding: theme.spacing(2, 0),
  overflowX: 'auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.palette.divider,
    zIndex: 0,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 0),
  }
}));

export const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  background: theme.palette.background.paper,
  padding: theme.spacing(0, 2),
  minWidth: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1),
  }
}));

const HorizontalTimeline = ({ timelineItems }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TimelineContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={isMobile ? 2 : 4}
        width="100%"
        flexWrap={{ xs: 'nowrap', sm: 'nowrap' }}
        sx={{ minWidth: 'min-content' }}
      >
        {timelineItems.map((item, index) => (
          <TimelineItem key={index}>
            {item.icon ?? null}
            <Typography
              variant={isMobile ? "caption" : "subtitle2"}
              color="text.secondary"
              sx={{ mt: 1, textAlign: 'center' }}
            >
              {item.title}
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              fontWeight="medium"
              sx={{ 
                textAlign: 'center',
                backgroundColor: 'primary.100',
                borderRadius: '5px',
                px: { xs: 1, sm: 2 },
                py: 0.5,
                border: '1px solid',
                borderColor: 'primary.200',
                textTransform: 'capitalize',
              }}
            >
              {item.value}
            </Typography>
          </TimelineItem>
        ))}
      </Stack>
    </TimelineContainer>
  );
};

export default HorizontalTimeline;