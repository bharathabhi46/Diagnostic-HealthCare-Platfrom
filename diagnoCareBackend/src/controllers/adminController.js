import User from "../models/user.js";
import Order from "../models/order.js";

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email role")
      .populate("collector", "name email role")
      .populate("tests");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

export async function getCollectors(req, res) {
  try {
    const collectors = await User.find({ role: "COLLECTOR" }).select(
      "name email role",
    );
    res.json(collectors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

export async function assignCollector(req, res) {
  try {
    const { orderId, collectorId } = req.body;
    const collector = await User.findById(collectorId);
    if (!collector || collector.role != "COLLECTOR") {
      return res.status(404).json({ message: "Invalid Collector" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    order.collector = collectorId;
    order.status = "ASSIGNED";
    await order.save();
    res.status(201).json({ message: "Collector Assigned Successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

export async function uploadReport(req, res) {
  try {
    const { orderId, reportUrl } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: " Order not Found" });
    }
    order.reportUrl = reportUrl;
    order.status = "REPORT_READY";
    await order.save();
    res.json({ message: "Report uploaded Successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
