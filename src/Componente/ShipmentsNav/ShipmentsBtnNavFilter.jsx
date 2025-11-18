import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { FormControl, FormControlLabel, IconButton, MenuItem, Switch, Box, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { fetchShipments } from "../../redux/Slices/shipmentSlice";
import { useCountries } from "../../context/CountriesProvider";
import CountrySelect from "../FilterComponents/CountrySelect";
import DateSelect from "../FilterComponents/DateSelect";
import NumberInput from "../FilterComponents/NumberInput";
import FilterBtnMenu from "../FilterComponents/FilterBtnMenu";

export default function ShipmentsBtnNavFilter() {
  const { countries } = useCountries();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [dateFrom, setDateFrom] = useState(""); // for afterExpectedDate
  const [dateTo, setDateTo] = useState(""); // for beforeExpectedDate
  const [lessThanReward, setLessThanReward] = useState("");
  const [moreThanReward, setMoreThanReward] = useState("");
  const [weight, setWeight] = useState("");
  const [latest, setLatest] = useState(true);

  const MAX_REWARD = 1000000;

  const dispatch = useDispatch();

  const handleToggleSwitch = (event) => {
    setLatest(event.target.checked);
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      weight,
      latest: event.target.checked
    }));
  };

  const handleClearDateFrom = () => {
    setDateFrom("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      toCity: destinationCity,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      weight,
      latest
    }));
  };

  const handleClearDateTo = () => {
    setDateTo("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      lessThanReward,
      moreThanReward,
      weight,
      latest
    }));
  };

  const handleClearOrigin = () => {
    setOrigin("");
    dispatch(fetchShipments({
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: "",
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      weight,
      latest
    }));
  };

  const handleClearDestination = () => {
    setDestination("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      fromCity: originCity,
      toCity: "",
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      weight,
      latest
    }));
  };

  const handleClearOriginCity = () => {
    setOriginCity("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      weight,
      latest
    }));
  };

  const handleClearDestinationCity = () => {
    setDestinationCity("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      weight,
      latest
    }));
  };

  const handleClearLessThanReward = () => {
    setLessThanReward("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      moreThanReward,
      weight,
      latest
    }));
  };

  const handleClearMoreThanReward = () => {
    setMoreThanReward("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      weight,
      latest
    }));
  };

  const handleClearWeight = () => {
    setWeight("");
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      latest
    }));
  };

  const handleClearLatest = () => {
    setLatest(false);
    dispatch(fetchShipments({
      from: countries.find((country) => country.name === origin)?.iso2,
      to: countries.find((country) => country.name === destination)?.iso2,
      fromCity: originCity,
      toCity: destinationCity,
      afterExpectedDate: dateFrom,
      beforeExpectedDate: dateTo,
      lessThanReward,
      moreThanReward,
      weight
    }));
  };

  const handleClearFilters = () => {
    setOrigin("");
    setDestination("");
    setOriginCity("");
    setDestinationCity("");
    setDateFrom("");
    setDateTo("");
    setLessThanReward("");
    setMoreThanReward("");
    setWeight("");
    setLatest(true);
    dispatch(fetchShipments({ page: 1, take: 3, latest: true }));
  };

  useEffect(() => {
    if (origin || destination || originCity || destinationCity || dateFrom || dateTo || lessThanReward || moreThanReward || weight) {
      const originIso2 = countries.find((country) => country.name === origin)?.iso2;
      const destinationIso2 = countries.find((country) => country.name === destination)?.iso2;

      dispatch(fetchShipments({
        from: originIso2,
        to: destinationIso2,
        fromCity: originCity,
        toCity: destinationCity,
        afterExpectedDate: dateFrom,
        beforeExpectedDate: dateTo,
        lessThanReward,
        moreThanReward,
        weight,
        latest
      }));
    }
  }, [origin, destination, originCity, destinationCity, dateFrom, dateTo, lessThanReward, moreThanReward, weight, dispatch, countries]);

  const handleRewardChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    const notValid = value === "" || isNaN(numValue) || numValue <= 0 || numValue > MAX_REWARD;
    if (notValid) return;
    switch (name) {
      case "lessThanReward":
        setLessThanReward(value);
        break;
      case "moreThanReward":
        setMoreThanReward(value);
        break;
    }
  };
  return (
    <FilterBtnMenu>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Filter Shipments
        </Typography>
        <IconButton onClick={handleClearFilters} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={latest}
              onChange={handleToggleSwitch}
              color="primary"
            />
          }
          label="Latest Shipments"
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

      <DateSelect label="Date From" date={dateFrom} setDate={setDateFrom} onClearSelect={handleClearDateFrom} />
      <DateSelect label="Date To" date={dateTo} setDate={setDateTo} onClearSelect={handleClearDateTo} />

      <NumberInput
        label="Min Reward"
        numberValue={moreThanReward}
        name={"moreThanReward"}
        max={MAX_REWARD}
        handleNumberChange={handleRewardChange}
        handleClearInput={handleClearMoreThanReward}
        helperText={lessThanReward ? `Value must be less than ${lessThanReward}` : `Enter a value between 1 and ${MAX_REWARD}`}
      />
      <NumberInput
        label="Max Reward"
        numberValue={lessThanReward}
        name={"lessThanReward"}
        max={MAX_REWARD}
        handleNumberChange={handleRewardChange}
        handleClearInput={handleClearLessThanReward}
        helperText={moreThanReward ? `Value must be greater than ${moreThanReward}` : `Enter a value between 1 and ${MAX_REWARD}`}
      />
      <NumberInput
        label="Weight"
        numberValue={weight}
        name={"weight"}
        max={50}
        helperText={"Enter a value between 0 and 50"}
        handleNumberChange={(e) => setWeight(e.target.value)}
        handleClearInput={handleClearWeight}
      />
    </FilterBtnMenu>
  );
}