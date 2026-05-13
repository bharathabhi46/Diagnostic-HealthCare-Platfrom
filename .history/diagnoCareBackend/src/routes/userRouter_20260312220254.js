import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import Order from "../models/order.js";

const userRouter = express.Router();

// Get my orders
userRouter.get(
  "/orders",
  authMiddleWare,
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

export default userRouter;
