/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "100%",
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        primary: {
          900: "#101037",
          800: "#21216D",
          700: "#3131A3",
          600: "#4141DA",
          500: "#6767E1",
          400: "#8D8DE9",
          300: "#B3B3F2",
          200: "#D9D9FA",
          100: "#F2F2FF",
        },
        secondary: {
          900: "#392607",
          800: "#734D0E",
          700: "#AC7315",
          600: "#E5991C",
          500: "#EAAD49",
          400: "#EFC277",
          300: "#F5D6A4",
          200: "#F5D6A4",
          100: "#FAEBD2",
        },
        success: {
          main: "#E5991C",
          500: "#4CAF50",
          700: "#388E3C"
        },
        error: {
          500: "#E94340",
          700: "#D32F2F"
        },
        warning: {
          500: "#FC9108",
          700: "#F57C00"
        },
        mainColor: "#4141DA",
      },
      fontFamily: {
        glancyr: ["Glancyr", "sans-serif"],
      },
    },
  },
  plugins: [],
};
