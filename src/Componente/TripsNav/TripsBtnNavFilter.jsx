import * as React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { FormControlLabel, IconButton, Switch } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { fetchTrips } from "../../redux/Slices/tripsSlice";
import { useCountries } from "../../context/CountriesProvider";
import CountrySelect from "../FilterComponents/CountrySelect";
import DateSelect from "../FilterComponents/DateSelect";
import NumberInput from "../FilterComponents/NumberInput";
import FilterBtnMenu from "../FilterComponents/FilterBtnMenu";

export default function TripsBtnNavFilter() {
  const { countries } = useCountries();
  const dispatch = useDispatch();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [weight, setWeight] = useState("");
  const [lessThanWight, setLessThanWight] = useState("");
  const [moreThanWight, setMoreThanWight] = useState("");
  const [showLatest, setShowLatest] = useState(true);

  const MAX_WEIGHT = 50;

  // useEffect(() => {
  //   dispatch(fetchTrips({ page: 1, take: 3, latest: true }));
  // }, [dispatch]);

  const handleToggleSwitch = (event) => {
    setShowLatest(event.target.checked);
    dispatch(fetchTrips({
      page: 1,
      take: 3,
      origin: countries.find((country) => country.name === origin)?.iso2,
      destination: countries.find((country) => country.name === destination)?.iso2,
      originCity,
      destinationCity,
      departDate,
      available: weight,
      lessThanWight,
      moreThanWight,
      latest: event.target.checked
    }));
  };

  const handleClearOrigin = () => {
    setOrigin("");
    dispatch(fetchTrips({
      destination: countries.find((country) => country.name === destination)?.iso2,
      destinationCity,
      originCity,
      departDate,
      available: weight,
      lessThanWight,
      moreThanWight,
      latest: showLatest
    }));
  };

  const handleClearDestination = () => {
    setDestination("");
    dispatch(fetchTrips({
      origin: countries.find((country) => country.name === origin)?.iso2,
      originCity,
      destinationCity: "",
      departDate,
      available: weight,
      lessThanWight,
      moreThanWight,
      latest: showLatest
    }));
  };

  const handleClearOriginCity = () => {
    setOriginCity("");
    dispatch(fetchTrips({
      origin: countries.find((country) => country.name === origin)?.iso2,
      destination: countries.find((country) => country.name === destination)?.iso2,
      destinationCity,
      departDate,
      available: weight,
      lessThanWight,
      moreThanWight,
      latest: showLatest
    }));
  };

  const handleClearDestinationCity = () => {
    setDestinationCity("");
    dispatch(fetchTrips({
      origin: countries.find((country) => country.name === origin)?.iso2,
      destination: countries.find((country) => country.name === destination)?.iso2,
      originCity,
      departDate,
      available: weight,
      lessThanWight,
      moreThanWight,
      latest: showLatest
    }));
  };

  const handleClearDateFrom = () => {
    setDepartDate("");
    dispatch(fetchTrips({
      origin: countries.find((country) => country.name === origin)?.iso2,
      destination: countries.find((country) => country.name === destination)?.iso2,
      originCity,
      destinationCity,
      available: weight,
      lessThanWight,
      moreThanWight,
      latest: showLatest
    }));
  };

  const handleClearWeight = () => {
    setWeight("");
    dispatch(fetchTrips({
      origin: countries.find((country) => country.name === origin)?.iso2,
      destination: countries.find((country) => country.name === destination)?.iso2,
      originCity,
      destinationCity,
      departDate,
      lessThanWight,
      moreThanWight,
      latest: showLatest
    }));
  };

  const handleClearLessThanWight = () => {
    setLessThanWight("");
    dispatch(fetchTrips({
      origin: countries.find((country) => country.name === origin)?.iso2,
      destination: countries.find((country) => country.name === destination)?.iso2,
      originCity,
      destinationCity,
      departDate,
      available: weight,
      moreThanWight,
      latest: showLatest
    }));
  };

  const handleClearMoreThanWight = () => {
    setMoreThanWight("");
    dispatch(fetchTrips({
      origin: countries.find((country) => country.name === origin)?.iso2,
      destination: countries.find((country) => country.name === destination)?.iso2,
      originCity,
      destinationCity,
      departDate,
      available: weight,
      lessThanWight,
      latest: showLatest
    }));
  };

  const handleClearFilters = () => {
    setOrigin("");
    setDestination("");
    setOriginCity("");
    setDestinationCity("");
    setDepartDate("");
    setWeight("");
    setLessThanWight("");
    setMoreThanWight("");
    setShowLatest(true);
    dispatch(fetchTrips({ page: 1, take: 3, latest: true }));
  };

  useEffect(() => {
    if (origin || destination || originCity || destinationCity || departDate || weight || lessThanWight || moreThanWight) {
      const originIso2 = countries.find((country) => country.name === origin)?.iso2;
      const destinationIso2 = countries.find((country) => country.name === destination)?.iso2;

      dispatch(fetchTrips({
        origin: originIso2,
        destination: destinationIso2,
        originCity,
        destinationCity,
        departDate,
        available: weight,
        lessThanWight,
        moreThanWight,
        latest: showLatest
      }));
    }
  }, [origin, destination, originCity, destinationCity, departDate, weight, lessThanWight, moreThanWight, countries, dispatch]);

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    if (value === '' || (numValue >= 0 && !isNaN(numValue))) {
      if (numValue > MAX_WEIGHT) {
        return;
      }
      switch (name) {
        case "weight":
          setWeight(value);
          break;
        case "lessThanWight":
          if (!moreThanWight || numValue > parseFloat(moreThanWight)) {
            setLessThanWight(value);
          }
          break;
        case "moreThanWight":
          if (!lessThanWight || numValue < parseFloat(lessThanWight)) {
            setMoreThanWight(value);
          }
          break;
      }
    }
  };

  return (
    <FilterBtnMenu>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Filter Trips
          </Typography>
          <IconButton
            onClick={handleClearFilters}
            size="small"
            aria-label="Clear all filters"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={showLatest}
                onChange={handleToggleSwitch}
                color="primary"
              />
            }
            label="Latest Trips"
          />
        </FormControl>

        <CountrySelect label="Origin" selectValue={origin} setSelectedValue={setOrigin} onClearSelect={handleClearOrigin}>
          {countries?.map((country) => (
            <MenuItem key={country.name} value={country.name}>
              {country.name}
            </MenuItem>
          ))}
        </CountrySelect>

        <CountrySelect
          label="Origin City"
          selectValue={originCity}
          setSelectedValue={setOriginCity}
          onClearSelect={handleClearOriginCity}
        >
          <MenuItem value="" sx={{ fontWeight: "bold", color: "primary.dark", fontSize: "1.1rem" }}>
            {origin ? `Cities in ${origin}` : "Select Origin Country First"}
          </MenuItem>
          {countries?.find((country) => country.name === origin)?.states?.map((city) => (
            <MenuItem key={city.name} value={city.name}>
              {city.name}
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

        <CountrySelect
          label="Destination City"
          selectValue={destinationCity}
          setSelectedValue={setDestinationCity}
          onClearSelect={handleClearDestinationCity}
        >
          <MenuItem value="" sx={{ fontWeight: "bold", color: "primary.dark", fontSize: "1.1rem" }}>
            {destination ? `Cities in ${destination}` : "Select Destination Country First"}
          </MenuItem>
          {countries?.find((country) => country.name === destination)?.states?.map((city) => (
            <MenuItem key={city.name} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </CountrySelect>

        <DateSelect label="Departure Date" date={departDate} setDate={setDepartDate} onClearSelect={handleClearDateFrom} />

        <NumberInput
          label="Weight (kg)"
          name="weight"
          numberValue={weight}
          handleNumberChange={handleNumberChange}
          handleClearInput={handleClearWeight}
          helperText={`Must be less than ${MAX_WEIGHT}`}
        />

        <NumberInput
          label="Weight More Than (kg)"
          name="moreThanWight"
          numberValue={moreThanWight}
          handleNumberChange={handleNumberChange}
          handleClearInput={handleClearMoreThanWight}
          helperText={lessThanWight ? `Must be less than ${lessThanWight}` : ''}
        />

        <NumberInput
          label="Weight Less Than (kg)"
          name="lessThanWight"
          numberValue={lessThanWight}
          handleNumberChange={handleNumberChange}
          handleClearInput={handleClearLessThanWight}
          helperText={moreThanWight ? `Must be more than ${moreThanWight}` : ''}
        />
      </FilterBtnMenu>
  );
}