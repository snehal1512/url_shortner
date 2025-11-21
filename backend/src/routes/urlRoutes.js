import express from "express";
import { createShortUrl } from "../controllers/urlController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create",authMiddleware, createShortUrl);

export default router;