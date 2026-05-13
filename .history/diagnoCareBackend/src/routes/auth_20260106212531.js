import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";
export const registerRouter = express.Router();
registerRouter.post("/register", registerUser);
registerRouter.post("/login", authMiddleWare, loginUser);
