import * as yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import loginImage from "../../assets/Images/big_logo.png";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginSuccess, login } from "../../redux/Slices/authSlice";
import Loading from "../../Componente/Loading/Loading";
import { motion } from "framer-motion";
import { Box, Button, Container, Paper, Typography, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fadeIn } from "../../Utils/motion";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  height: 'auto',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  background: "white",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  [theme.breakpoints.up('md')]: {
    width: '450px',
    height: 'auto'
  },
  [theme.breakpoints.up('lg')]: {
    width: '500px',
    height: '430px'
  },
  [theme.breakpoints.up('xl')]: {
    width: '600px'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: "12px 24px",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "1.2rem",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary[700],
  },
}));

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const loginSuccess = localStorage.getItem("isLoggedIn")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mySchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const userData = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/landingPage/home", { replace: true });
      dispatch(changeLoginSuccess());
    }
  }, [loginSuccess , navigate]);

  const sendDataToLogin = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (error) {
      toast.error(
        <div className="text-center">
          <p>{error}</p>
        </div>,
        {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
        }
      );
    }
  }, [error]);

  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        background:
          "linear-gradient(135deg, #4141DA 0%, #3131A3 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "200%",
          height: "250%",
          top: "-50%",
          left: "-50%",
          background:
            "radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent)",
          backgroundSize: "50px 50px",
          opacity: 0.1,
          animation: "rotate 20s linear infinite",
        },
        "@keyframes rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    >
      <ToastContainer />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, md: 4 },
            p: { xs: 2, sm: 3, md: 4 },
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          <motion.div
            variants={fadeIn("right", "spring", 0.2, 1)}
            initial="hidden"
            animate="show"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, md: 2 }
            }}
          >
            <Box
              component="img"
              src={loginImage}
              alt="login"
              sx={{
                width: { xs: "180px", sm: "220px", md: "100%" },
                maxWidth: "400px",
                height: "auto",
                objectFit: "fill",
                filter: "drop-shadow(0 0 20px rgba(0,0,0,0.2))",
                transition: "all 0.3s ease-in-out",
                mb: { xs: 3, md: 0 }
              }}
            />
          </motion.div>

          <motion.div
            variants={fadeIn("left", "spring", 0.2, 1)}
            initial="hidden"
            animate="show"
            style={{
              width: "100%",
              maxWidth: "500px",
              order: { xs: 2, md: 1 }
            }}
          >
            <StyledPaper elevation={3}>
              <Typography
                variant="h6"
                component="h1"
                // light gray color
                sx={{
                  color: "lightgray",
                  textAlign: "center",
                }}
              >Welcome to
              </Typography>

              <Typography
                variant="h4"
                component="h1"
                sx={{
                  mb: 8,
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                Hatly Dashboard
              </Typography>

              <form onSubmit={myFormik.handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="relative">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder=" "
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-primary-600 outline-none transition-all peer"
                      value={myFormik.values.email}
                      onChange={myFormik.handleChange}
                    />
                    <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 opacity-0 transition-opacity peer-focus:opacity-100 peer-[&:not(:placeholder-shown)]:opacity-100" />
                    <label
                      htmlFor="email"
                      className="absolute left-10 top-1/2 -translate-y-1/2 bg-white px-2 text-gray-600 transition-all peer-focus:-top-0.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-primary-600 peer-[&:not(:placeholder-shown)]:-top-0.5 peer-[&:not(:placeholder-shown)]:left-4 peer-[&:not(:placeholder-shown)]:text-sm rounded-xl peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:text-primary-600"
                    >
                      Email Address
                    </label>
                  </div>
                  {myFormik.touched.email && myFormik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{myFormik.errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder=" "
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none transition-all peer"
                      value={myFormik.values.password}
                      onChange={myFormik.handleChange}
                    />
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 opacity-0 transition-opacity peer-focus:opacity-100 peer-[&:not(:placeholder-shown)]:opacity-100" />
                    <label
                      htmlFor="password"
                      className="absolute left-10 top-1/2 -translate-y-1/2 bg-white px-2 text-gray-600 transition-all peer-focus:-top-0.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-primary-600 peer-[&:not(:placeholder-shown)]:-top-0.5 peer-[&:not(:placeholder-shown)]:left-4 peer-[&:not(:placeholder-shown)]:text-sm rounded-xl peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:text-primary-600"
                    >
                      Password
                    </label>
                  </div>
                  {myFormik.touched.password && myFormik.errors.password && (
                    <p className="mt-1 text-sm text-red-600">{myFormik.errors.password}</p>
                  )}
                </div>

                <StyledButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <Loading /> : "Sign In"}
                </StyledButton>
              </form>
            </StyledPaper>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
