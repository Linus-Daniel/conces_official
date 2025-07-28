import axios from "axios";

const isBrowser = typeof window !== "undefined";

const hostname = isBrowser ? window.location.hostname : "localhost";

// Dynamically build baseURL based on the device
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://conces-official.vercel.app/api"
    : `http://${hostname}:3000/api`;

const token = isBrowser ? localStorage.getItem("token") : null;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default api;
