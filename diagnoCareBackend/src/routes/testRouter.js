import express from "express";
import { addTest, getAllTests } from "../controllers/testController.js";
export const testRouter = express.Router();
testRouter.post("/", addTest);
testRouter.get("/", getAllTests);
