import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  getAssignedOrder,
  updateStatus,
} from "../controllers/collectorController.js";
export const controllerRouter = express.Router();
controllerRouter.get(
  "/orders",
  authMiddleWare,
  authorizeRoles("COLLECTOR"),
  getAssignedOrder,
);

controllerRouter.put(
  "/status",
  authMiddleWare,
  authorizeRoles("COLLECTOR"),
  updateStatus,
);
