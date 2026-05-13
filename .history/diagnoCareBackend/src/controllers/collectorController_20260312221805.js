import Order from "../models/order.js";

export async function getAssignedOrder(req, res) {
  try {
    const collectorId = req.user.id;

    const orders = await Order.find({ collector: collectorId })
      .populate("user", "name email")
      .populate("tests");

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
}

export async function updateStatus(req, res) {
  try {
    const { orderId } = req.body;
    const collectorId = req.user.id;

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }

    if (order.collector?.toString() !== collectorId) {
      return res.status(403).json({ message: "Not Your Assigned Order" });
    }

    order.status = "SAMPLE_COLLECTED";
    await order.save();

    return res.status(200).json({
      message: "Sample Collected Successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
}
