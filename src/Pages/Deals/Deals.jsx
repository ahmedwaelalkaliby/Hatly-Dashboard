import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDeals } from "../../redux/Slices/dealsSlice";
import DealsGrid from "../../Componente/DealsGrid/DealsGrid";
import DealNav from "../../Componente/DealNav/DealNav";

export default function Deals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeals({ page: 1, take: 10 }));
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full">
      <DealNav />
      <div className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <DealsGrid />
        </div>
      </div>
    </div>
  );
}