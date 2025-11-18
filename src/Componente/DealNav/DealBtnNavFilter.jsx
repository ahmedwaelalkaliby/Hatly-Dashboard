import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from '@mui/icons-material/FilterList';

import { useCountries } from "../../context/CountriesProvider";
import { fetchDeals, setFilteredDeals } from "../../redux/Slices/dealsSlice";
import CountrySelect from "../FilterComponents/CountrySelect";
import FilterBtnMenu from "../FilterComponents/FilterBtnMenu";

export default function DealBtnNavFilter() {
  const { countries } = useCountries();

  // server filteration
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [emailFilters, setEmailFilters] = useState({
    traveler: "",
    shopper: ""
  });
  const [appliedFilters, setAppliedFilters] = useState({
    travelerEmail: "",
    shopperEmail: ""
  });

  // front filteration
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const { deals } = useSelector((state) => state.deals);


  const handleClearStatus = () => {
    setStatus("");
    dispatch(fetchDeals({ 
      type, 
      createdAt 
    }));
  };

  
  const handleClearTravelerEmail = () => {
    setEmailFilters(prev => ({ ...prev, traveler: "" }));
    setAppliedFilters(prev => ({ ...prev, travelerEmail: "" }));
    dispatch(fetchDeals({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      shopperEmail: appliedFilters.shopperEmail
    }));
  };
  const handleClearShopperEmail = () => {
    setEmailFilters(prev => ({ ...prev, shopper: "" }));
    setAppliedFilters(prev => ({ ...prev, shopperEmail: "" }));
    dispatch(fetchDeals({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      travelerEmail: appliedFilters.travelerEmail
    }));
  };

  const handleClearOrigin = () => {
    setOrigin("");
    dispatch(fetchDeals({
      to: countries.find((country) => country.name === destination)?.iso2,
      travelerEmail: appliedFilters.travelerEmail,
      shopperEmail: appliedFilters.shopperEmail
    }));
  };

  const handleClearDestination = () => {
    setDestination("");
    dispatch(fetchDeals({
      from: countries.find((country) => country.name === origin)?.iso2,
      travelerEmail: appliedFilters.travelerEmail,
      shopperEmail: appliedFilters.shopperEmail
    }));
  };

  const handleClearFilters = () => {
    setStatus("");
    setOrigin("");
    setDestination("");
    setEmailFilters({ traveler: "", shopper: "" });
    setAppliedFilters({ travelerEmail: "", shopperEmail: "" });
    dispatch(fetchDeals({ page: 1, take: 3 }));
  };

  const handleEmailChange = (type) => (e) => {
    setEmailFilters(prev => ({
      ...prev,
      [type]: e.target.value
    }));
  };

  const applyEmailFilter = (type) => () => {
    const value = emailFilters[type];
    setAppliedFilters(prev => ({
      ...prev,
      [type === 'traveler' ? 'travelerEmail' : 'shopperEmail']: value
    }));
  };

  useEffect(() => {
    if (origin || destination || appliedFilters.travelerEmail || appliedFilters.shopperEmail || status) {
      let filteredResults = [...deals];

      if (status) {
        filteredResults = filteredResults.filter(deal => deal.dealStatus.toLowerCase() === status.toLowerCase());
      }

      const originIso2 = countries.find((country) => country.name === origin)?.iso2;
      const destinationIso2 = countries.find((country) => country.name === destination)?.iso2;

      dispatch(fetchDeals({
        from: originIso2,
        to: destinationIso2,
        travelerEmail: appliedFilters.travelerEmail,
        shopperEmail: appliedFilters.shopperEmail,
      }));
    }
  }, [origin, destination, appliedFilters.travelerEmail, appliedFilters.shopperEmail, status, dispatch, countries]);

  useEffect(() => {
    if (deals && deals.length > 0) {
      let filteredResults = [...deals];

      if (status) {
        filteredResults = filteredResults.filter(deal => deal.dealStatus.toLowerCase() === status.toLowerCase());
      }

      dispatch(setFilteredDeals(filteredResults));
    }
  }, [status, deals, dispatch]);

  return (
    <FilterBtnMenu>
      {/* Status Filter */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          endAdornment={
            status && (
              <IconButton
                size="small"
                sx={{ color: "red", marginRight: "15px" }}
                onClick={handleClearStatus}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
      </FormControl>

      <CountrySelect
        label="Origin"
        selectValue={origin}
        setSelectedValue={setOrigin}
        onClearSelect={handleClearOrigin}
      >
        {countries?.map((country) => (
          <MenuItem key={country.name} value={country.name}>
            {country.name}
          </MenuItem>
        ))}
      </CountrySelect>

      <CountrySelect
        label="Destination"
        selectValue={destination}
        setSelectedValue={setDestination}
        onClearSelect={handleClearDestination}
      >
        {countries?.map((country) => (
          <MenuItem key={country.name} value={country.name}>
            {country.name}
          </MenuItem>
        ))}
      </CountrySelect>

      <MenuItem disableRipple>
        <FormControl fullWidth>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Traveler Email"
              value={emailFilters.traveler}
              onChange={handleEmailChange('traveler')}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: emailFilters.traveler && (
                    <IconButton
                      size="small"
                      sx={{ color: "red" }}
                      onClick={handleClearTravelerEmail}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ),
                }
              }}
            />
            <IconButton
              onClick={applyEmailFilter('traveler')}
              sx={{
                color: '#4141DA',
                bgcolor: emailFilters.traveler !== appliedFilters.travelerEmail ? '#e3e3ff' : 'transparent'
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Box>
        </FormControl>
      </MenuItem>

      <MenuItem disableRipple>
        <FormControl fullWidth>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Shopper Email"
              value={emailFilters.shopper}
              onChange={handleEmailChange('shopper')}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: emailFilters.shopper && (
                    <IconButton
                      size="small"
                      sx={{ color: "red" }}
                      onClick={handleClearShopperEmail}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ),
                }
              }}
            />
            <IconButton
              onClick={applyEmailFilter('shopper')}
              sx={{
                color: '#4141DA',
                bgcolor: emailFilters.shopper !== appliedFilters.shopperEmail ? '#e3e3ff' : 'transparent'
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Box>
        </FormControl>
      </MenuItem>

      <Divider sx={{ my: 1 }} />

      {/* Clear Filters Button */}
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
    </FilterBtnMenu>
  );
}