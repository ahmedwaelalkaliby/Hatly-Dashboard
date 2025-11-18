import * as React from "react";
import { Button, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useDispatch } from "react-redux";
import { setShowFilter } from "../../Redux/Reducers/shipmentsSlice";

export default function ShipmentsBtnNavFilter() {
  const dispatch = useDispatch();

  const handleFilterClick = () => {
    dispatch(setShowFilter(true));
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={handleFilterClick}
        sx={{
          backgroundColor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "grey.100",
          },
        }}
      >
        Filter
      </Button>
    </Box>
  );
} 