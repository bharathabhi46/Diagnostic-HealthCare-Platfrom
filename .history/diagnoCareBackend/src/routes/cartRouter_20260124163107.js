import express from "express";
import {
  addCart,
  getCart,
  removeCart,
  clearCart,
} from "../controllers/cartController.js";
import { authMiddleWare } from "../middleware/authMiddleware";
export const cartRouter = express.Router();
cartRouter.post("/add", authMiddleWare);
