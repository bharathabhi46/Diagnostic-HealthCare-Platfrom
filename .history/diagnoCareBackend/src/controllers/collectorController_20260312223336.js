import Order from "../models/order.js";
export async function getAssignedOrder(req, res) {
  try {
    const collectorId = req.user.id;
    const orders = await Order.find({ collector: collectorId })
      .populate("user", "name email")
      .populate("tests");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
export async function updateStatus(req, res) {
  try {
    const { orderId } = req.body;
    const collectorId = req.user.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json("Order Not Found");
    }
    if (order.collector.toString() !== collectorId) {
      return res.status(404).json({ message: "Not Your Assigned Order" });
    }
    order.status = "SAMPLE_COLLECTED";
    res.status(201).json({ message: "Sample Collected Successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
