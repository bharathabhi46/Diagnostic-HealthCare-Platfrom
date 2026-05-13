import express from "express";
import {
  addPackage,
  getAllPackages,
} from "../controllers/packageController.js";
export const packageRouter = express.Router();
packageRouter.post("/", addPackage);
packageRouter.get("/", getAllPackages);
