import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
const registerRouter = express.Router();
registerRouter.post("/register", registerUser);
registerRouter.post("/login", loginUser);
