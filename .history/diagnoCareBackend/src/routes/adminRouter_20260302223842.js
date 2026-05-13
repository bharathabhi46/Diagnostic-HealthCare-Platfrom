import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { assignCollector } from "../controllers/adminController.js";
import { uploadReport } from "../controllers/adminController.js";
export const adminRouter = express.Router();
adminRouter.post(
  "/assign",
  authMiddleWare,
  authorizeRoles("ADMIN"),
  assignCollector,
);
router.post(
  "/upload-report",
  authMiddleware,
  authorizeRoles("ADMIN"),
  uploadReport,
);
