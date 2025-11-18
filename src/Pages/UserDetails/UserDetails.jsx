import React, { useEffect, useRef, useState } from "react";
import { CloudUpload, Person, Email, LocationOn, Phone, CalendarToday, LocalPostOffice, Badge, Edit, VerifiedUser } from "@mui/icons-material";
import loginImage from "../../assets/Images/loginImage.png";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  FormLabel,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Box,
  Grid,
  Typography,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import { useParams } from "react-router-dom";
import Loading from "../../Componente/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails, verifyUser } from "../../redux/Slices/UserDetailsSlice";
import PhoneInputComponent from "../../Componente/PhoneInputComponent/PhoneInputComponent";
import { useCountries } from "../../context/CountriesProvider";

export default function UserDetails() {
  const passportImageRef = useRef(null);

  const { id } = useParams();
  const { countries, loading: countriesLoading } = useCountries();
  const state = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(loginImage);
  const [passportPhoto, setPassportPhoto] = useState("");
  const [profilePhotoInPayload, setProfilePhotoInPayload] = useState("");
  const [passportPhotoInPayload, setPassportPhotoInPayload] = useState("");
  const [countryCode, setCode] = useState("");
  const [dialCode, setDialCode] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [id]);

  useEffect(() => {
    if (state.user) {
      setRole(state.user.role ?? "");
      setCountry(state.user.country ?? "");
      setCity(state.user.city ?? "");
      setPostalCode(state.user.postalCode ?? "");
      setDateOfBirth(state.user.dateOfBirth ?? "");
      setPhone(state.user.phone?.phoneNumber ?? "");
      setProfilePhoto(state.user.profilePhoto ?? loginImage);
      setPassportPhoto(state.user.passportPhoto ?? "");
      setCode(state.user.phone?.countryCode ?? "");
      setDialCode(state.user.phone?.dialCode ?? "");
    }
    console.log(state.user, "state.user");

    if (state.UserDetailsError) {
      toast.error(state.UserDetailsError);
    }
    if (state.updateError) {
      toast.error(state.updateError);
    }
    if (state.verifyError) {
      toast.error(state.verifyError);
    }
    if (state.success) {
      toast.success("User details updated successfully");
    }
  }, [state]);

  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find((c) => c.iso2 === country);
      const newCities = selectedCountry?.states || [];
      setCities(newCities);
      if (!newCities.some((c) => c.name === city)) {
        setCity("");
      }
    }
  }, [country, countries]);

  const updateUser = () => {
    let updatedPhone = phone;
    if (updatedPhone !== "") {
      if (!phone.startsWith("+")) {
        updatedPhone = `+${dialCode}${phone}`;
        setPhone(updatedPhone);
      }
    }

    // Create payload object with only non-empty values
    const payload = {
      userId: id,
    };
    console.log("passporttt", passportPhotoInPayload);

    // Add only non-empty values to the payload
    if (role) payload.role = role;
    if (country) payload.country = country;
    if (city) payload.city = city;
    if (postalCode) payload.postalCode = postalCode;
    if (dateOfBirth) payload.dateOfBirth = dateOfBirth;
    if (updatedPhone) payload.phone = updatedPhone;
    if (profilePhotoInPayload) payload.profilePhoto = profilePhotoInPayload;
    if (passportPhotoInPayload) payload.passportPhoto = passportPhotoInPayload;

    console.log("Update payload:", payload);
    dispatch(updateUserDetails(payload));
  };


  const handlePassportUpload = (event) => {
    const file = event.target.files[0];
    console.log("file", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPassportPhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    console.log("file", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (passportPhoto) {
      setPassportPhotoInPayload(passportPhoto.split(",")[1]);
      // console.log("passportPhotoInPayload", passportPhoto.split(",")[1]);
    }

  }, [passportPhoto]);


  useEffect(() => {
    if (profilePhoto) {
      setProfilePhotoInPayload(profilePhoto.split(",")[1]);
      console.log("profileeeee", profilePhotoInPayload);
    }

  }, [profilePhoto]);

  const handleCopyEmail = (email) => {
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

  const handleVerifyUser = () => {
    dispatch(verifyUser(id));
  };

  if (state.UserDetailsLoading) return <Loading />;

  return (
    <div className="w-full p-4 md:p-6 bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} className="h-full rounded-xl overflow-hidden">
            <Box className="relative">
              <CardMedia
                component="img"
                height="200"
                image={profilePhoto !== null ? profilePhoto : loginImage}
                alt="User Avatar"
                className="object-cover"
              />
              <Box className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <Typography variant="h5" className="text-white font-bold">
                  {state.user.firstName} {state.user.lastName}
                </Typography>
                <Typography variant="body2" className="text-white/80">
                  {state.user.email}
                </Typography>
              </Box>
            </Box>
            <CardContent className="p-4">
              <input
                type="file"
                id="uploadProfile"
                className="hidden"
                onChange={handleProfilePhotoUpload}
                accept="image/*"
              />
              <label htmlFor="uploadProfile" className="w-full">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                  className="!bg-mainColor w-full hover:!bg-mainColor/90 transition-colors duration-300"
                >
                  Change Profile Picture
                </Button>
              </label>
            </CardContent>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={2} className="h-full rounded-xl p-8">
            <Typography variant="h5" className="font-bold text-slate-700 " sx={{ mb: 4 }}>
              User Information
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="User ID"
                  variant="outlined"
                  value={state.user?.id ?? ""}
                  disabled
                  className="mb-6"
                  InputProps={{
                    startAdornment: <Badge className="mr-2 text-gray-400" />,
                    className: "bg-white rounded-lg",
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      '&.Mui-focused': {
                        color: '#3b82f6',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={state.user.email}
                  disabled
                  className="mb-6"
                  InputProps={{
                    startAdornment: <Email className="mr-2 text-gray-400" />,
                    className: "bg-white rounded-lg",
                    onClick: () => handleCopyEmail(state.user.email),
                    sx: {
                      cursor: "pointer",
                      "&:hover": { color: "#2196F3" },
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      '&.Mui-focused': {
                        color: '#3b82f6',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth className="mb-6">
                  <FormLabel className="flex items-center text-gray-600 mb-2">
                    <LocationOn className="mr-2 text-gray-400" />
                    Country
                  </FormLabel>
                  <Select
                    value={country ?? ""}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={countriesLoading || !countries.length}
                    className="transition-all duration-300 bg-white rounded-lg"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      },
                      '& .MuiSelect-select': {
                        padding: '12px 14px',
                      },
                    }}
                  >
                    {countriesLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                      countries.map((c) => (
                        <MenuItem key={c.iso2} value={c.iso2} className="hover:bg-blue-50">
                          {c.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth className="mb-6">
                  <FormLabel className="flex items-center text-gray-600 mb-2">
                    <LocationOn className="mr-2 text-gray-400" />
                    City
                  </FormLabel>
                  <Select
                    value={city ?? ""}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!cities.length}
                    className="transition-all duration-300 bg-white rounded-lg"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      },
                      '& .MuiSelect-select': {
                        padding: '12px 14px',
                      },
                    }}
                  >
                    {cities.length > 0 ? (
                      cities.map((s) => (
                        <MenuItem key={s.name} value={s.name} className="hover:bg-blue-50">
                          {s.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Select a country first</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  variant="outlined"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="mb-6"
                  InputProps={{
                    startAdornment: <LocalPostOffice className="mr-2 text-gray-400" />,
                    className: "bg-white rounded-lg",
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      '&.Mui-focused': {
                        color: '#3b82f6',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={dateOfBirth || ""}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="mb-6"
                  InputProps={{
                    startAdornment: <CalendarToday className="mr-2 text-gray-400" />,
                    className: "bg-white rounded-lg",
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      '&.Mui-focused': {
                        color: '#3b82f6',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth className="mb-6">
                  <FormLabel className="flex items-center text-gray-600 mb-2">
                    <Person className="mr-2 text-gray-400" />
                    Role
                  </FormLabel>
                  <Select
                    value={role ?? ""}
                    onChange={(e) => setRole(e.target.value)}
                    className="transition-all duration-300 bg-white rounded-lg"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      },
                      '& .MuiSelect-select': {
                        padding: '12px 14px',
                      },
                    }}
                  >
                    <MenuItem value="customer" className="hover:bg-blue-50">Customer</MenuItem>
                    <MenuItem value="admin" className="hover:bg-blue-50">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth className="mb-6">
                  <FormLabel className="flex items-center text-gray-600 mb-2">
                    <Phone className="mr-2 text-gray-400" />
                    Phone Number
                  </FormLabel>
                  <PhoneInputComponent
                    initialPhone={dialCode && phone ? `+${dialCode}${phone}` : ""}
                    onPhoneChange={(value) => {
                      setPhone(value);
                      const parsedDialCode = value?.split(" ")[0].replace("+", "");
                      setDialCode(parsedDialCode);
                      console.log("Phone Updated:", value);
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={2} className="mt-6 rounded-xl p-6">
        <Box className="flex items-center justify-between mb-6">
          <Typography variant="h5" className="font-bold text-slate-700">
            Passport Information
          </Typography>
          <input
            type="file"
            id="uploadPassport"
            className="hidden"
            onChange={handlePassportUpload}
          />
          <label htmlFor="uploadPassport">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
              className="!bg-mainColor hover:!bg-mainColor/90 transition-colors duration-300"
            >
              Upload Passport
            </Button>
          </label>
        </Box>

        <Box className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
          {passportPhoto ? (
            <img
              src={passportPhoto}
              alt="Passport"
              className="w-64 cursor-pointer rounded-lg object-cover shadow-md transition-all duration-300 hover:shadow-lg"
            />
          ) : (
            <Box className="flex flex-col items-center text-center p-8">
              <Badge className="text-gray-400 mb-4" style={{ fontSize: '3rem' }} />
              <Typography className="text-gray-500 mb-2">
                No passport uploaded yet
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Upload a clear image of your passport for verification
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Box className="mt-6 flex gap-4">
        <Button
          variant="contained"
          className="!bg-green-500 hover:!bg-green-600 text-white w-full py-3 transition-all duration-300"
          fullWidth
          onClick={updateUser}
          disabled={state.updateLoading}
        >
          {state.updateLoading ? (
            <CircularProgress size={24} className="!text-white" />
          ) : (
            <Box className="flex items-center justify-center">
              <Edit className="mr-2" />
              Update User Information
            </Box>
          )}
        </Button>

        <Button
          variant="contained"
          className="!bg-blue-500 hover:!bg-blue-600 text-white w-full py-3 transition-all duration-300"
          fullWidth
          onClick={handleVerifyUser}
          disabled={state.verifyLoading || state.user?.verify}
        >
          {state.verifyLoading ? (
            <CircularProgress size={24} className="!text-white" />
          ) : (
            <Box className="flex items-center justify-center text-white">
              <VerifiedUser className="mr-2" />
              {state.user?.verify ? "User is Verified" : "Verify User"}
            </Box>
          )}
        </Button>
      </Box>
    </div>
  );
}
