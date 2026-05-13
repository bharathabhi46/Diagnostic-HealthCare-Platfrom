import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import {
  addCart,
  getCart,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

export const cartRouter = express.Router();

cartRouter.post("/add", addCart);
cartRouter.get("/", getCart);
cartRouter.delete("/clear", clearCart);
cartRouter.delete("/:itemId", removeItem);
