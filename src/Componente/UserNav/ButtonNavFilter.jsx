import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useCountries } from "../../context/CountriesProvider";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setFilteredUsers } from "../../redux/Slices/UsersSlice";
import PhoneInputComponent from "../PhoneInputComponent/PhoneInputComponent";

export default function AccountMenu() {
  let { users, filteredUsers } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const { countries, loading: countriesLoading } = useCountries();
  const [isVerified, setIsVerified] = useState(null);
  console.log(isVerified, "isVerified");
  console.log(typeof isVerified, "isVerified");

  const dispatch = useDispatch();
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

  const handleClick = (e) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClearCountry = () => {
    setCountry("");
    setCity("");
    setCities([]);
  };
  const handleClearCity = () => {
    setCity("");
  };
  const handleClearRole = () => {
    setRole("");
  };
  const handleClearDOB = () => {
    setDateOfBirth("");
  };
  const handleClearEmail = () => {
    setEmail("");
  };
  const handleClearPhone = () => {
    setPhone("");
  };
  const handleClearFilters = () => {
    handleClearCountry();
    handleClearCity();
    handleClearRole();
    handleClearDOB();
    handleClearEmail();
    handleClearPhone();
    setIsVerified(null);
  };

  useEffect(() => {
    const filters = {};
    const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (email) filters.email = emailFormat.test(email) ? email : "m@g.com";
    if (phone) filters.phone = phone;
    if (country) filters.country = country;
    if (city) filters.city = city;
    if (role) filters.role = role;
    if (dateOfBirth) filters.dateOfBirth = dateOfBirth;
    if (isVerified !== null) filters.verify = isVerified;

    if (Object.keys(filters).length > 0) {
      dispatch(fetchUsers(filters));
    } else {
      dispatch(fetchUsers({ page: 1, take: 3 }));
    }
  }, [email, phone, country, city, role, dateOfBirth, isVerified]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Button
          onClick={handleClick}
          sx={{
            ml: 1,
            color: "#4141DA",
            fontSize: "17px",
            fontWeight: "bold",
            padding: "5px 20px",
            borderRadius: "5px",
            border: "1px solid #4141DA",
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          Filter
          <FilterAltIcon sx={{ ml: 1 }} />
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              p: 2,
              minWidth: "300px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Email */}
        <MenuItem disableRipple>
          <OutlinedInput
            fullWidth
            placeholder="Email"
            type="email"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              console.log(email, "email");
            }}
            endAdornment={
              email && (
                <IconButton
                  size="small"
                  sx={{ color: "red" }}
                  onClick={handleClearEmail}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )
            }
          />
        </MenuItem>
        {/* Country */}
        <MenuItem disableRipple>
          <FormControl fullWidth>
            <InputLabel id="country-select-label"> Country</InputLabel>
            <Select
              labelId="country-select-label"
              label="Country"
              value={country ?? ""}
              onChange={(e) => {
                setCountry(e.target.value);

                console.log(country, "country");
              }}
              disabled={countriesLoading || !countries.length}
              endAdornment={
                country && (
                  <IconButton
                    size="small"
                    sx={{ color: "red" }}
                    onClick={handleClearCountry}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )
              }
            >
              {countriesLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                countries.map((c) => (
                  <MenuItem key={c.iso2} value={c.iso2}>
                    {c.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </MenuItem>
        {/* City */}
        <MenuItem disableRipple>
          <FormControl fullWidth>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              label="City"
              value={city ?? ""}
              onChange={(e) => {
                setCity(e.target.value);

                console.log(city, "city");
              }}
              disabled={!cities.length}
              endAdornment={
                city && (
                  <IconButton
                    size="small"
                    sx={{ color: "red", marginRight: "15px" }}
                    onClick={handleClearCity}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )
              }
            >
              {cities.length > 0 ? (
                cities.map((s) => (
                  <MenuItem key={s.name} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Select a country first</MenuItem>
              )}
            </Select>
          </FormControl>
        </MenuItem>
        {/* Phone */}
        <MenuItem disableRipple>
          {/* <OutlinedInput
            fullWidth
            placeholder="Phone"
            type="tel"
            size="small"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);

              console.log(phone, "phone");
            }}
            endAdornment={
              phone && (
                <IconButton
                  size="small"
                  sx={{ color: "red" }}
                  onClick={handleClearPhone}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )
            }
          /> */}
          <Box sx={{ width: "100%" }}>
            <PhoneInputComponent
              isFitler={true}
              onPhoneChange={(value) => {
                if (value) {
                  const parsedPhone = value.slice(3);
                  setPhone(parsedPhone);
                } else {
                  setPhone("");
                }
              }}
            />
          </Box>
        </MenuItem>
        {/* Role */}
        <MenuItem disableRipple>
          <FormControl fullWidth size="small">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              label="Role"
              labelId="role-select-label"
              id="role-select"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);

                console.log(role, "role");
              }}
              endAdornment={
                role && (
                  <IconButton
                    size="small"
                    sx={{ color: "red", marginRight: "15px" }}
                    onClick={handleClearRole}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )
              }
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="customer">customer</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        {/* Birth Date */}
        <MenuItem disableRipple>
          <OutlinedInput
            fullWidth
            placeholder="Birth Date"
            type="date"
            size="small"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);

              console.log(dateOfBirth, "dateOfBirth");
            }}
            endAdornment={
              dateOfBirth && (
                <IconButton
                  size="small"
                  sx={{ color: "red" }}
                  onClick={handleClearDOB}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )
            }
          />
        </MenuItem>
        {/* Verification */}
        {/* <MenuItem disableRipple>
          <RadioGroup
            row
            value={isVerified}
            onChange={(e) => {
              setIsVerified(e.target.value === "true");

              console.log(isVerified, "isVerified");
            }}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Verified"
              onClick={() => setIsVerified(true)}
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Not Verified"
              onClick={() => setIsVerified(false)}
            />
          </RadioGroup>
          <MenuItem disableRipple>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                setIsVerified(null);
              }}
            >
              Reset
            </Button>
          </MenuItem>
        </MenuItem> */}
        <Box sx={{ px: 3, display: "flex", alignItems: "center" }}>
          <RadioGroup
            row
            value={isVerified}
            onChange={(e) => {
              setIsVerified(() => {
                if (e.target.value === "true") {
                  return true;
                } else {
                  return false;
                }
              });
            }}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Verified"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Not Verified"
            />
          </RadioGroup>
          <Box mt={1}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                setIsVerified(null);
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />
        {/* Reset Button */}
        <MenuItem disableRipple>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ fontWeight: "bold" }}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
