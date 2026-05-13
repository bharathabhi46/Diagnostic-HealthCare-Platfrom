import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  getAssignedOrder,
  updateStatus,
} from "../controllers/collectorController.js";
