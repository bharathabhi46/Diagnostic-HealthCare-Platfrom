import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { bookOrder } from "../controllers/orderController.js";

const orderRouterjsjs = express.Router();

orderRouterjsjs.post("/book", authMiddleware, bookOrder);

export default orderRouterjsjs;
