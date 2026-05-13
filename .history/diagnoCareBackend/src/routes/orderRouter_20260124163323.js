import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { bookOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/book", authMiddleware, bookOrder);

export default orderRouter;
