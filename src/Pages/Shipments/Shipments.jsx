import React, { useEffect } from 'react'
import ShipmentsGrid from '../../Componente/ShipmentsGrid/ShipmentsGrid'
import ShipmentsNav from '../../Componente/ShipmentsNav/ShipmentsNav'
import { useDispatch } from 'react-redux';
import { fetchShipments } from '../../redux/Slices/shipmentSlice';

export default function Shipments() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShipments({ page: 1, take: 10, latest: true }));
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full">
      <ShipmentsNav />
      <div className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ShipmentsGrid />
        </div>
      </div>
    </div>
  )
}
