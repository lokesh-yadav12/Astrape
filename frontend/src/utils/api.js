import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ ensures cookies are sent automatically
});

export default API;
