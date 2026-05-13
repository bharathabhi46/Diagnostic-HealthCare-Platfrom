import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addCart,
  getCart,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addCart);
cartRouter.get("/", authMiddleware, getCart);
cartRouter.delete("/clear", authMiddleware, clearCart);
cartRouter.delete("/:itemId", authMiddleware, removeItem);

export default cartRouter;
