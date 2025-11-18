import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import { useDispatch, useSelector } from "react-redux";
import UsersGrid from "../UsersGrid/UsersGrid";
import { fetchUsers } from "../../redux/Slices/UsersSlice";
import { fetchDeals } from "../../redux/Slices/dealsSlice";
import { fetchTrips } from "../../redux/Slices/tripsSlice";
import { fetchShipments } from "../../redux/Slices/shipmentSlice";

export default function MainGrid() {
  const dispatch = useDispatch();
  const { totalData: totalUsers, UsersLoading } = useSelector((state) => state.users);
  const { totalData: totalTrips, loading: tripsLoading } = useSelector((state) => state.trips);
  const { totalData: totalShipments, loading: shipmentsLoading } = useSelector((state) => state.shipments);
  const { totalData: totalDeals, loading: dealsLoading } = useSelector((state) => state.deals);

  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDeals());
    dispatch(fetchTrips());
    dispatch(fetchShipments());
  }, []);

  const data = [
    {
      title: "Users",
      value: `${totalUsers}`,
      isLoading: UsersLoading,
    },
    {
      title: "Trips",
      value: `${totalTrips}`,
      isLoading: tripsLoading,
    },
    {
      title: "Shipments",
      value: `${totalShipments}`,
      isLoading: shipmentsLoading,
    },
    {
      title: "Deals",
      value: `${totalDeals}`,
      isLoading: dealsLoading,
    },
  ];

  return (
    <Box>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.4rem' }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <StatCard {...card} isloading={card.isLoading} />
          </Grid>
        ))}


      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.4rem' }}>
        Users
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <UsersGrid inHomePage={true} />
        </Grid>
      </Grid>
    </Box>
  );
}
