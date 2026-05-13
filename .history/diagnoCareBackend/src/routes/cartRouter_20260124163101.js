import express from "express";
import {
  addCart,
  getCart,
  removeCart,
  clearCart,
} from "../controllers/cartController.js";
export const cartRouter = express.Router();
cartRouter.post("/add");
