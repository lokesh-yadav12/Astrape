import express from "express";
import { createItem, getItems } from "../controllers/itemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createItem);
router.get("/", getItems);

export default router;
