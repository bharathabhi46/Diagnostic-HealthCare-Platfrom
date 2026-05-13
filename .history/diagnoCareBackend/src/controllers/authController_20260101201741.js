import validator from "validator";
import bcrypt from "bcryptjs";
export async function registerUser(req, res) {
  let { name, email, password, role } = req.body;
  if ((!name, !email, !password, !role)) {
    return res.status(401).json({ error: "All the fields are required!" });
  }
  name = name.trim();
  email = email.trim();
  password = password.trim();
  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(401).json({
      error:
        "Username must be 1–20 czharacters, using letters, numbers, _ or -.",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(401).json({ error: "Invalid Email format." });
  }
  let hashedPassword = await bcrypt.hash(password, 10);
}
export async function loginUser(req, res) {
  let { username, password } = req.body;
  if (username == "" || password == "") {
    return res.status(401).json({ error: "All the fields are required !" });
  }
  username = username.trim();
  if (!username) {
  }
}
