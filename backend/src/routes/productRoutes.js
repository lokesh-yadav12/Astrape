import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import multer from "multer";

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), addProduct);
router.get("/", getProducts);

export default router;
