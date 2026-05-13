import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import {
  addCart,
  getCart,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

export const cartRouter = express.Router();

cartRouter.post("/add", authMiddleWare, addCart);
cartRouter.get("/", authMiddleWare, getCart);
cartRouter.delete("/clear", authMiddleWare, clearCart);
cartRouter.delete("/:itemId", authMiddleWare, removeItem);

cartRouter;
