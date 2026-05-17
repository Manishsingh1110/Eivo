import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const userRegister = async (formData) => {
  return axios.post(`${BASE_URL}/api/auth/user/register`, formData);
};

export const userLogin = async (formData) => {
  return axios.post(`${BASE_URL}/api/auth/user/login`, formData);
};

export const stationLogin = async (formData) => {
  return axios.post(`${BASE_URL}/api/station/login`, formData);
};

export const stationRegister = async (formData) => {
  return axios.post(`${BASE_URL}/api/station/register`, formData);
};
