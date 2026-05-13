import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  assignCollector,
  getAllOrders,
  getCollectors,
  uploadReport,
} from "../controllers/adminController.js";

export const adminRouter = express.Router();

adminRouter.get(
  "/orders",
  authMiddleWare,
  authorizeRoles("ADMIN"),
  getAllOrders,
);

adminRouter.get(
  "/collectors",
  authMiddleWare,
  authorizeRoles("ADMIN"),
  getCollectors,
);

adminRouter.post(
  "/assign",
  authMiddleWare,
  authorizeRoles("ADMIN"),
  assignCollector,
);
adminRouter.post(
  "/upload-report",
  authMiddleWare,
  authorizeRoles("ADMIN"),
  uploadReport,
);
