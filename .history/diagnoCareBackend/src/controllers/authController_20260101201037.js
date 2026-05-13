export async function registerUser(req, res) {
  let { name, email, password, role } = req.body;
  if ((!name, !email, !password, !role)) {
    return res.status(401).json({ error: "All the fields are required!" });
  }
  name = name.trim();
  email = email.trim();
  password = password.trim();
}
