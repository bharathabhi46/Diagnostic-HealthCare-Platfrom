import Feedback from "../models/feedback.js";
import Order from "../models/order.js";

/* =====================================
   Submit feedback (USER)
===================================== */
export const submitFeedback = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your order" });
    }

    if (order.status !== "COMPLETED") {
      return res.status(400).json({ message: "Order not completed yet" });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      order: orderId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Feedback submitted",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
