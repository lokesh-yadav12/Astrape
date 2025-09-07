import axios from "axios";

const API = axios.create({
  baseURL: "https://astrape.onrender.com/api",
  withCredentials: true, // ✅ ensures cookies are sent automatically
});

export default API;
