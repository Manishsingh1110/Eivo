import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const getStations = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${BASE_URL}/api/stations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStationById = async (id) => {
  return axios.get(`${BASE_URL}/api/stations/${id}`);
};

export const createStation = async (data) => {
  return axios.post(`${BASE_URL}/api/stations`, data);
};

export const updateStation = async (id, data) => {
  return axios.put(`${BASE_URL}/api/stations/${id}`, data);
};

export const deleteStation = async (id) => {
  return axios.delete(`${BASE_URL}/api/stations/${id}`);
};
