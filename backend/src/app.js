import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cartRoutes from "./routes/cartRoutes.js";  // import your cart routes



dotenv.config();
const app = express();


// Middleware
app.use(express.json());

app.use(cookieParser()); // ✅ parse cookies
app.use(cors({
  origin: "https://astrape.vercel.app", // React frontend URL
  credentials: true              // ✅ allow cookies
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);  //new
app.use("/api/cart", cartRoutes);               // register cart routes




mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
