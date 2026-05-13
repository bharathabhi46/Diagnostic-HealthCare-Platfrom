import Package from "../models/package.js";
export async function addPackage(req, res) {
  try {
    const { name, description, tests, price } = req.body;
    if (!name || !price) {
      res.status(401).json({ message: "Name and Price Fields are required" });
    }
    const package = Package.create({
      name,
      description,
      tests,
      price,
    });
  } catch (err) {}
}
