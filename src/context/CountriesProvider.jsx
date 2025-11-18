import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const CountriesContext = createContext();

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCountries() {
    try {
        const response = await axiosInstance.get(`/assets`, {
        params: { withStates: true },  
      });
      setCountries(response.data.countries || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, loading }}>
      {children}
    </CountriesContext.Provider>
  );
}
export default CountriesContext;
export function useCountries() {
  return useContext(CountriesContext);
}
