import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { submitFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", authMiddleWare, authorizeRoles("USER"), submitFeedback);

export default router;
