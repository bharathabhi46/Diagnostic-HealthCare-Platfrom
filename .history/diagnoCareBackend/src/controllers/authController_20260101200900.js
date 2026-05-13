export async function registerUser(req, res) {
  let { name, email, password, role } = req.body;
  if ((!name, !email, !password, !role)) {
    return res.status(401).json({ message: "All the fields are required!" });
  }
}
