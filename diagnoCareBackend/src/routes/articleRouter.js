import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { addArticle, getArticles } from "../controllers/articleController.js";

const articleRouter = express.Router();

articleRouter.post("/", authMiddleWare, authorizeRoles("ADMIN"), addArticle);

articleRouter.get("/", getArticles);

export default articleRouter;
