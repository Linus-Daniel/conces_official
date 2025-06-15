// lib/axios.ts
import axios from "axios";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
 const URL = process.env.NODE_ENV === "production"?"linus":"http://localhost:3000/api"
const api = axios.create({
  baseURL: URL, 
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default api;
