import { styled } from '@mui/material/styles';
import { TableCell, TableContainer, TableHead, TableRow, Button, Select } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: theme.borders.light,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
        padding: '8px',
        fontSize: '0.75rem',
    }
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: "16px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    transition: "all 0.3s ease",
    "&:hover": {
        boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.2)",
    },
    [theme.breakpoints.down('sm')]: {
        borderRadius: "8px",
        maxWidth: '100vw',
    }
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: theme.palette.primary.main,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    "& th": {
        color: "white",
        fontWeight: 600,
        padding: "16px",
        fontSize: "0.875rem",
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            padding: "8px",
            fontSize: "0.75rem",
        },
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: "all 0.2s ease",
    "&:hover": {
        background: "rgba(33, 150, 243, 0.05)",
    },
    "& td": {
        padding: "16px",
        fontSize: "0.875rem",
        [theme.breakpoints.down('sm')]: {
            padding: "8px",
            fontSize: "0.75rem",
        },
    },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 600,
    padding: "8px 16px",
    transition: "all 0.2s ease",
    "&:hover": {
        transform: "translateY(-2px)",
    },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2196F3",
    },
}));

export const ContextMenuComponent = styled('div')(({ theme }) => ({
    position: "absolute",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
    zIndex: 1000,
    overflow: "hidden",
    "& ul": {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    "& li": {
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
            background: "rgba(33, 150, 243, 0.05)",
        },
    },
}));