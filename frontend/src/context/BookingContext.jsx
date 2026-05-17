import { createContext, useState } from "react";
import axios from "axios";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const API_URL = "http://localhost:3001/app";

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings`);

      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBooking = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, data);

      await fetchBookings();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        fetchBookings,
        createBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
