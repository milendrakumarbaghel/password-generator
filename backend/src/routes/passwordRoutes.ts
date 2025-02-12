import express from "express";
import { generatePassword, getPasswordHistory } from "../controllers/passwordController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/generate", authMiddleware, generatePassword);
router.get("/history", authMiddleware, getPasswordHistory);

export default router;
