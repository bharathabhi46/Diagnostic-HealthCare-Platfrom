import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { bookOrder } from "../controllers/bookingController.js";

const orderRouter = express.Router();

orderRouter.post("/book", authMiddleWare, bookOrder);

export  orderRouter;
