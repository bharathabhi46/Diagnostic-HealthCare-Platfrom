import express from "express";
import { registerUser } from "../controllers/authController.js";
const registerRouter = express.Router();
registerRouter.post("/register", registerUser);
