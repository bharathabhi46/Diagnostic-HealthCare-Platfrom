import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { bookOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/book", authMiddleware, bookOrder);

export default router;
