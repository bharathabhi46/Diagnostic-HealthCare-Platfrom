import Package from "../models/package.js";
export async function addPackage(req, res) {
  try {
    const { name, description, tests, price } = req.body;
    if (!name || !price) {
      res.status(401).json({ message: "Name and Price Fields are required" });
    }
    const newPackage = Package.create({
      name,
      description,
      tests,
      price,
    });
    res
      .status(201)
      .json({ message: "New Package is added successfully", newPackage });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function getAllPackages(req, res) {
  try {
    const packages = Package.find({ isActive: true }).populate("tests");
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
