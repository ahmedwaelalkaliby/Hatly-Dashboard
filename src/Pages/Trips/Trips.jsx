import React, { useEffect } from 'react'
import TripsGrid from '../../Componente/TripsGrid/TripsGrid'
import TripsNav from '../../Componente/TripsNav/TripsNav'
import { useDispatch } from 'react-redux';
import { fetchTrips } from '../../redux/Slices/tripsSlice';

export default function Trips() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrips({ page: 1, take: 10, latest: true }));
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full">
      <TripsNav />
      <div className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <TripsGrid />
        </div>
      </div>
    </div>
  )
}
