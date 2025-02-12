import express from "express";
import { generatePassword, getPasswordHistory } from "../controllers/passwordController";
import authMiddleware from "../middlewares/authMiddleware"; // Ensure this middleware is correctly implemented

const router = express.Router();

router.post("/generate", authMiddleware, generatePassword);
router.get("/history", authMiddleware, getPasswordHistory);

export default router;
