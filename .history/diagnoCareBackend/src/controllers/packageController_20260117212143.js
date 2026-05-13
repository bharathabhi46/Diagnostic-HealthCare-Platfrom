import Package from "../models/package.js";

export async function addPackage(req, res) {
  try {
    const { name, description, tests, price } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and Price fields are required" });
    }

    const newPackage = await Package.create({
      name,
      description,
      tests,
      price,
    });

    res.status(201).json({
      message: "New Package is added successfully",
      newPackage,
    });
  } catch (err) {
    console.error("Add package error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
}

export async function getAllPackages(req, res) {
  try {
    const packages = await Package.find({ isActive: true }).populate("tests");
    res.status(200).json(packages);
  } catch (err) {
    console.error("Get packages error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
}
