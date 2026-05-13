import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import Order from "../models/order.js";

const router = express.Router();

// Get my orders
router.get(
  "/orders",
  authMiddleware,
  authorizeRoles("USER"),
  async (req, res) => {
    try {
      const orders = await Order.find({
        user: req.user.id,
      }).populate("tests");

      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
