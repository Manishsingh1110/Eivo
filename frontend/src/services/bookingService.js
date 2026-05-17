// src/services/bookingService.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createBooking = async (formData, token) => {
  return axios.post(`${BASE_URL}/bookings`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyBookings = async (token) => {
  return axios.get(`${BASE_URL}/bookings/my-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllBookings = async () => {
  return axios.get(`${BASE_URL}/bookings`);
};

export const getBookingById = async (id) => {
  return axios.get(`${BASE_URL}/bookings/${id}`);
};

export const getUserBookings = async (userId) => {
  return axios.get(`${BASE_URL}/bookings/user/${userId}`);
};

export const getStationBookings = async (stationId) => {
  return axios.get(`${BASE_URL}/bookings/station/${stationId}`);
};

export const updateBooking = async (id, updatedData) => {
  return axios.put(`${BASE_URL}/bookings/${id}`, updatedData);
};

export const deleteBooking = async (id) => {
  return axios.delete(`${BASE_URL}/bookings/${id}`);
};
