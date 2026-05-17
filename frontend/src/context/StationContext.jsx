import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchStations = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_URL}/api/stations`);

      setStations(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addStation = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/stations`, data);

      await fetchStations();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateStation = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/stations/${id}`, data);

      await fetchStations();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStation = async (id) => {
    try {
      await axios.delete(`${API_URL}/stations/${id}`);

      await fetchStations();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <StationContext.Provider
      value={{
        stations,
        loading,
        fetchStations,
        addStation,
        updateStation,
        deleteStation,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};
