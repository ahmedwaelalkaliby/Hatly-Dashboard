import React, { useState, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { WidthFull } from "@mui/icons-material";

// Custom input for Material UI
const CustomPhoneInput = React.forwardRef((props, ref) => (
  <TextField
    {...props}
    inputRef={ref}
    fullWidth
    label="Phone"
    variant="outlined"
  />
));

// Separate Phone Input Component
export default function PhoneInputComponent({
  initialPhone,
  onPhoneChange,
  isFitler,
}) {
  const [temporaryPhone, setTemporaryPhone] = useState(initialPhone || "");

  // Sync with initialPhone when it changes
  useEffect(() => {
    setTemporaryPhone(initialPhone || "");
  }, [initialPhone]);

  // Handle phone change (no re-render outside)
  const handlePhoneChange = (value) => {
    if (isFitler) {
      onPhoneChange(temporaryPhone);
      setTemporaryPhone(value);
    } else {
      setTemporaryPhone(value);
    }
  };

  // Only update when leaving the input
  const handlePhoneBlur = () => {
    if (isFitler) {
      onPhoneChange(temporaryPhone);
    } else {
      if (isValidPhoneNumber(temporaryPhone)) {
        onPhoneChange(temporaryPhone);
      } else {
        toast.error("Invalid phone number");
        onPhoneChange("");
      }
    }
  };
  if (isFitler) {
    return (
      <PhoneInput
        style={{ alignItems: "end" }}
        placeholder="Enter phone number"
        international
        value={temporaryPhone}
        onChange={handlePhoneChange}
        inputComponent={CustomPhoneInput}
      />
    );
  }
  return (
    <PhoneInput
      style={{ alignItems: "end" }}
      placeholder="Enter phone number"
      international
      value={temporaryPhone}
      onChange={handlePhoneChange}
      onBlur={handlePhoneBlur} // Only update on blur
      inputComponent={CustomPhoneInput}
    />
  );
}
