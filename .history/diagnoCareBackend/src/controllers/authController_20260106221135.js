import validator from "validator";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
export async function registerUser(req, res) {
  try {
    let { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All the fields are required!" });
    }
    name = name.trim();
    email = email.trim();
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid Email format." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    });
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
}
export async function loginUser(req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All the fields are required !" });
    }
    email = email.trim();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid crendentials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "login Successfull",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}
