import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  useTheme,
  alpha,
  Paper,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCountries } from '../../context/CountriesProvider';
import { addUser } from '../../redux/Slices/UsersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const MotionPaper = motion.create(Paper);
const MotionButton = motion.create(Button);

export default function AddUser() {
  const { countries } = useCountries();
  const theme = useTheme();
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [cities, setCities] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [profilePhotoInPayload, setProfilePhotoInPayload] = useState(null);
  const [passportPhotoInPayload, setPassportPhotoInPayload] = useState(null);
  const [profilePhotoLoading, setProfilePhotoLoading] = useState(false);
  const [passportPhotoLoading, setPassportPhotoLoading] = useState(false);
  const [profilePhotoError, setProfilePhotoError] = useState(null);
  const [passportPhotoError, setPassportPhotoError] = useState(null);
  const { addUserLoading, addUserError } = useSelector(state => state.users);
  const navigate = useNavigate();
  // Handle form field changes
  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    role: "",
    password: "",
    profilePhoto: profilePhotoInPayload,
    passportPhoto: passportPhotoInPayload
  });

  // Add validation states
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    role: "",
    password: "",
  });

  // Validation functions
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value) error = "First name is required";
        else if (value.length < 2) error = "First name must be at least 2 characters";
        break;
      case "lastName":
        if (!value) error = "Last name is required";
        else if (value.length < 2) error = "Last name must be at least 2 characters";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) 
          error = "Invalid email address";
        break;
      case "phone":
        if (!value) error = "Phone number is required";
        else if (!/^\+?[1-9]\d{1,14}$/.test(value.replace(/\D/g, "")))
          error = "Invalid phone number";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "city":
        if (!value) error = "City is required";
        break;
      case "postalCode":
        if (!value) error = "Postal code is required";
        else if (!/^\d{5}(-\d{4})?$/.test(value))
          error = "Invalid postal code format";
        break;
      case "role":
        if (!value) error = "Role is required";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Password must be at least 8 characters";
        else if (!/(?=.*[a-z])/.test(value)) error = "Password must contain at least one lowercase letter";
        else if (!/(?=.*[A-Z])/.test(value)) error = "Password must contain at least one uppercase letter";
        else if (!/(?=.*\d)/.test(value)) error = "Password must contain at least one number";
        else if (!/(?=.*[!@#$%^&*])/.test(value)) error = "Password must contain at least one special character";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validate the field
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Handle profile photo upload
  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    setProfilePhotoError(null);
    setProfilePhotoLoading(true);

    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
        setProfilePhotoError('Invalid file type. Please upload a JPEG or PNG image.');
        setProfilePhotoLoading(false);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setProfilePhotoError('File size too large. Maximum size is 5MB.');
        setProfilePhotoLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePhoto(base64String);
        setProfilePhotoLoading(false);
      };

      reader.onerror = () => {
        setProfilePhotoError('Error reading file. Please try again.');
        setProfilePhotoLoading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle passport photo upload
  const handlePassportPhotoUpload = (event) => {
    const file = event.target.files[0];
    setPassportPhotoError(null);
    setPassportPhotoLoading(true);

    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
        setPassportPhotoError('Invalid file type. Please upload a JPEG or PNG image.');
        setPassportPhotoLoading(false);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setPassportPhotoError('File size too large. Maximum size is 5MB.');
        setPassportPhotoLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPassportPhoto(base64String);
        setPassportPhotoLoading(false);
      };

      reader.onerror = () => {
        setPassportPhotoError('Error reading file. Please try again.');
        setPassportPhotoLoading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    if ( passportPhoto ) {
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

  // Update cities when country changes
  useEffect(() => {
    if (formData.country) {
      const country = countries.find(c => c.iso2 === formData.country);
      setCities(country?.states || []);
      setFormData(prev => ({ ...prev, city: "" })); // Reset city when country changes
    } else {
      setCities([]);
      setFormData(prev => ({ ...prev, city: "" }));
    }
  }, [formData.country, countries]);

  console.log(countries);

  const dispatch = useDispatch();
  const handleAddUser = async () => {
    // Validate all fields before submission
    const newErrors = {};
    let hasError = false;

    Object.keys(formData).forEach(field => {
      if (field !== 'profilePhoto' && field !== 'passportPhoto') {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          hasError = true;
        }
      }
    });

    setErrors(newErrors);

    if (hasError) {
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      // Validate passwords match
      if (formData.password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate images
      if (!profilePhotoInPayload || !passportPhotoInPayload) {
        toast.error('Please upload both profile and passport photos');
        return;
      }

      // Dispatch the action
      await dispatch(addUser(formData)).unwrap();

      // Reset form or redirect if needed
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        postalCode: "",
        role: "",
        password: "",
        profilePhoto: null,
        passportPhoto: null
      });
      setConfirmPassword("");
      setProfilePhoto(null);
      setPassportPhoto(null);
      setProfilePhotoInPayload(null);
      setPassportPhotoInPayload(null);
      setErrors({});
      toast.success('User added successfully!' , {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate('/landingPage/users');
      }, 2000);

    } catch (error) {
      // Handle error
      toast.error(error.message || 'Failed to add user');
    }
  };

  // Show error toast if there's an error in Redux state
  useEffect(() => {
    if (addUserError) {
      toast.error(addUserError, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [addUserError]);

  // Update the preview display in the UI
  const renderImagePreview = (preview, alt, loading, error) => {
    if (loading) {
      return (
        <Box
          sx={{
            width: '100%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(theme.palette.background.default, 0.5),
            borderRadius: 1,
            border:`1px dashed ${alpha(theme.palette.divider, 0.2)}`
          }}
        >
          <CircularProgress size={40} />
        </Box>
      );
    }

    if (error) {
      return (
        <Box
          sx={{
            width: '100%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(theme.palette.error.light, 0.1),
            borderRadius: 1,
            border: `1px dashed ${theme.palette.error.main}`,
          }}
        >
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
      );
    }

    if (preview) {
      return (
        <Box
          component="img"
          src={preview}
          alt={alt}
          sx={{
            width: '100%',
            maxHeight: 200,
            objectFit: 'contain',
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          }}
        />
      );
    }

    return (
      <Box
        sx={{
          width: '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: alpha(theme.palette.background.default, 0.5),
          borderRadius: 1,
          border: "1px dashed ${alpha(theme.palette.divider, 0.2)}",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No {alt} uploaded
        </Typography>
      </Box>
    );
  }; 

  return (
    <Box 
      sx={{ 
        width: '100%',
        minHeight: '100vh',
        p: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: alpha(theme.palette.background.default, 0.5),
        backgroundImage: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)} 25%, transparent 25%),
                         linear-gradient(-45deg, ${alpha(theme.palette.primary.main, 0.05)} 25%, transparent 25%),
                         linear-gradient(45deg, transparent 75%, ${alpha(theme.palette.primary.main, 0.05)} 75%),
                         linear-gradient(-45deg, transparent 75%, ${alpha(theme.palette.primary.main, 0.05)} 75%)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        overflow: 'hidden',
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
        //   px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <MotionPaper
          elevation={8}
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            width: '100%',
            background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow:` 0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 4,
              fontWeight: 700,
              color: theme.palette.primary.main,
              textShadow:` 0 2px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background:` linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px',
              },
            }}
          >
            Add New User
          </Typography>
          
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <PersonIcon sx={{ color: theme.palette.primary.main }} />
                  Personal Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        boxShadow:` 0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                      },
                    },
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.phone}>
                  <PhoneInput
                    international
                    defaultCountry="EG"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(value) => {
                      setFormData(prev => ({ ...prev, phone: value }));
                      const error = validateField('phone', value);
                      setErrors(prev => ({ ...prev, phone: error }));
                    }}
                  />
                  {errors.phone && <FormHelperText>{errors.phone}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.country}>
                  <InputLabel>Country</InputLabel>
                  <Select 
                    label="Country"
                    value={formData.country}
                    onChange={handleChange('country')}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.iso2} value={country.iso2}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.city}>
                  <InputLabel>City</InputLabel>
                  <Select 
                    label="City"
                    value={formData.city}
                    onChange={handleChange('city')}
                    disabled={!formData.country}
                  >
                    {cities.length > 0 ? (
                      cities.map((city) => (
                        <MenuItem key={city.name} value={city.name}>
                          {city.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        {formData.country ? "No cities available" : "Select a country first"}
                      </MenuItem>
                    )}
                  </Select>
                  {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange('postalCode')}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>


              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    mt: 2,
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <SecurityIcon sx={{ color: theme.palette.primary.main }} />
                  Security Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select 
                    label="Role"
                    value={formData.role}
                    onChange={handleChange('role')}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                  {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={formData.password !== confirmPassword && confirmPassword !== ""}
                  helperText={formData.password !== confirmPassword && confirmPassword !== "" ? "Passwords do not match" : ""}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    mt: 2,
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <AttachFileIcon sx={{ color: theme.palette.primary.main }} />
                  Document Uploads
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                    borderRadius: 2,
                    border:` 1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow:` 0 0 0 1px ${theme.palette.primary.main}`,
                    },
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    Passport Upload
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {renderImagePreview(passportPhoto, 'Passport Photo', passportPhotoLoading, passportPhotoError)}
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="passport-upload"
                      type="file"
                      onChange={handlePassportPhotoUpload}
                    />
                    <label htmlFor="passport-upload">
                      <MotionButton
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={passportPhotoLoading}
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        {passportPhotoLoading ? 'Uploading...' : 'Upload Passport'}
                      </MotionButton>
                    </label>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                    borderRadius: 2,
                    border:` 1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow:` 0 0 0 1px ${theme.palette.primary.main}`,
                    },
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    Profile Photo Upload
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {renderImagePreview(profilePhoto, 'Profile Photo', profilePhotoLoading, profilePhotoError)}
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="profile-photo-upload"
                      type="file"
                      onChange={handleProfilePhotoUpload}
                    />
                    <label htmlFor="profile-photo-upload">
                      <MotionButton
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={profilePhotoLoading}
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        {profilePhotoLoading ? 'Uploading...' : 'Upload Photo'}
                      </MotionButton>
                    </label>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <MotionButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ 
                    mt: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow:` 0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.39)}`,
                    '&:hover': {
                      background:` linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      boxShadow:` 0 6px 20px ${alpha(theme.palette.primary.main, 0.23)}`,
                    },
                    position: 'relative',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddUser}
                  disabled={addUserLoading}
                >
                  {addUserLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={24} color="inherit" />
                      <span>Adding User...</span>
                    </Box>
                  ) : (
                    'Add User'
                  )}
                </MotionButton>
              </Grid>
            </Grid>
          </form>
        </MotionPaper>
      </Box>
      {addUserLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.background.paper, 0.7),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
}