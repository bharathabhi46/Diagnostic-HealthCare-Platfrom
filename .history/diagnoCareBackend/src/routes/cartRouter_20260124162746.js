import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/clear", authMiddleware, clearCart);
router.delete("/:itemId", authMiddleware, removeItem);

export default router;
