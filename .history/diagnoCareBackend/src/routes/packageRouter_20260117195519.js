import express from "express";
import {
  addPackage,
  getAllPackages,
} from "../controllers/packageController.js";
export const packageRouter = expess.Router();
packageRouter.post("/addPackage", addPackage);
packageRouter.get("/getPackage", getAllPackages);
