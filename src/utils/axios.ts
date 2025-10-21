import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const refresh = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
