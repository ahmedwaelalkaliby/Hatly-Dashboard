import { Rating, Stack, Tooltip, Typography, Box } from '@mui/material';
import React from 'react'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { toast } from 'react-toastify';
import { StyledTableCell } from './TableStyles';
import { useTheme } from '@emotion/react';

export default function UserCell({
    firstName = "N/A",
    lastName = "N/A",
    email = "N/A",
    averageRating = 0,
    profilePhoto = "https://fakeimg.pl/600x400?text=N/A"
}) {
    const theme = useTheme();

    const handleCopyEmail = (e, email) => {
        e.stopPropagation();
        navigator.clipboard.writeText(email);
        toast.success("Email copied to clipboard", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    return (
        <>
            <StyledTableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                    {profilePhoto ? (
                        <Box
                            component="img"
                            src={profilePhoto}
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
                    )}
                    <Stack>
                        <Typography variant="body2" fontWeight={600}>
                            {firstName + " " + lastName}
                        </Typography>
                        <Tooltip title="Click to copy email" arrow>
                            <Typography
                                variant="body2"
                                onClick={(e) => handleCopyEmail(e, email)}
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { color: theme.palette.primary.main },
                                    fontSize: "0.75rem",
                                    maxWidth: "180px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {email}
                            </Typography>
                        </Tooltip>
                        <Rating
                            value={averageRating}
                            precision={0.5}
                            readOnly
                            size="small"
                            color="secondary.main"
                            sx={{
                                fontSize: '0.75rem',
                                '& .MuiRating-iconFilled': {
                                    fontSize: '0.75rem'
                                },
                                '& .MuiRating-iconEmpty': {
                                    fontSize: '0.75rem'
                                }
                            }}
                        />
                    </Stack>
                </Stack>
            </StyledTableCell></>
    )
}
