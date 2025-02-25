import express from "express";
import { generatePassword, getPasswordHistory } from "../controllers/passwordController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/generate", authMiddleware, generatePassword);
router.get("/history", authMiddleware, getPasswordHistory);

export default router;
