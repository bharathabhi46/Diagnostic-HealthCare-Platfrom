import validator from "validator";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { useReducer } from "react";
export async function registerUser(req, res) {
  try {
    let { name, email, password, role } = req.body;
    if ((!name, !email, !password)) {
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
}
export async function loginUser(req, res) {
  let { username, password } = req.body;
  if (username == "" || password == "") {
    return res.status(401).json({ error: "All the fields are required !" });
  }
  username = username.trim();
}
