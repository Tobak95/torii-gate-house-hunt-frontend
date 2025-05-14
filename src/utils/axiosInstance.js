import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://torii-gate-tobi.onrender.com/api",
});
