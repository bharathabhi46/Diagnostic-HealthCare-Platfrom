import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { submitFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.post(
  "/",
  authMiddleWare,
  authorizeRoles("USER"),
  submitFeedback,
);

export default feedbackRouter;
