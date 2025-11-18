import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    typography: {
        fontFamily: "Glancyr, sans-serif",
    },
    palette: {
        primary: {
            main: "#4141DA",
            light: "#6767E1",
            dark: "#3131A3",
            "900": "#101037",
            "800": "#21216D",
            "700": "#3131A3",
            "600": "#4141DA", // main
            "500": "#6767E1",
            "400": "#8D8DE9",
            "300": "#B3B3F2",
            "200": "#D9D9FA",
            "100": "#F2F2FF",
        },
        secondary: {
            main: "#E5991C",
            light: "#EAAD49",
            dark: "#AC7315",
            "900": "#392607",
            "800": "#734D0E",
            "700": "#AC7315",
            "600": "#E5991C", // main
            "500": "#EAAD49",
            "400": "#EFC277",
            "300": "#F5D6A4",
            "200": "#F5D6A4",
            "100": "#FAEBD2",
        },
        success: {
            main: "#4BA64F",
        }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
    borders: {
        light: '1px solid rgba(0, 0, 0, 0.1)',
        medium: '1px solid rgba(0, 0, 0, 0.2)',
        dark: '1px solid rgba(0, 0, 0, 0.3)',
        primary: '1px solid #2196F3',
    },
});

export default function AppThemeProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}