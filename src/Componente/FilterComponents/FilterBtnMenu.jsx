import React, { useState } from 'react'
import { Box, Button, Menu } from '@mui/material';
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function FilterBtnMenu({ children }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleOpenMenu = (e) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(false);
    };
    return (<>
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
            <Button
                onClick={handleOpenMenu}
                sx={{
                    ml: 1,
                    color: "#4141DA",
                    fontSize: "17px",
                    fontWeight: "bold",
                    padding: "5px 20px",
                    borderRadius: "5px",
                    border: "1px solid #4141DA",
                }}
                aria-controls={open ? "trip-filter-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                aria-label="Open trip filters"
            >
                Filter
                <FilterAltIcon sx={{ ml: 1 }} />
            </Button>
        </Box>

        <Menu
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{ zIndex: 1000 }}
            anchorEl={anchorEl}
            id="trip-filter-menu"
            open={open}
            onClose={handleCloseMenu}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        p: 2,
                        minWidth: "300px",
                        maxWidth: "450px",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        width: "100%",
                        "@media (max-width: 600px)": {
                            width: "90vw",
                        },
                    },
                },
            }}
        >
            {children}
        </Menu>
    </>);
}
