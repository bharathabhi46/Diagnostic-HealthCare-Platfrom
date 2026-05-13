import express from "express";
import { addPackage } from "../controllers/packageController.js";
export const packageRouter = expess.Router();
packageRouter.post("/addPackage", addPackage);
