import Cart from "../models/Cart.js";
import Order from "../models/order.js";

export const bookOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.test");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const tests = cart.items.map((item) => item.test._id);

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.test.price,
      0,
    );

    const order = await Order.create({
      user: userId,
      tests,
      totalAmount,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order booked successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export function assignCollector(req, res) {
  try {
  } catch (error) {}
}
