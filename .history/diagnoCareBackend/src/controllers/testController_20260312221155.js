import Test from "../models/test.js";
export async function addTest(req, res) {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !price) {
      return res.status(401).json({ message: "Name and Price are required!" });
    }
    const test = await Test.create({
      name,
      description,
      price,
      category,
    });
    res.status(201).json({
      message: "Test addes successfully",
      test,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function getAllTests(req, res) {
  try {
    const tests = await Test.find({ isActive: true });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
