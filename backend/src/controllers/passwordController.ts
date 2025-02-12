import { Request, Response } from "express";
import { saveGeneratedPassword, getUserPasswords } from "../models/passwordModel";
import { generateRandomPassword } from "../utils/passwordGenerator";

export const generatePassword = async (req: Request, res: Response) => {
  try {
    const { length, includeUppercase, includeNumbers, includeSpecialChars, description } = req.body;
    const userId = req.userId;

    const password = generateRandomPassword(length, includeUppercase, includeNumbers, includeSpecialChars);
    await saveGeneratedPassword(userId, password, description);

    res.json({ password });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getPasswordHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const passwords = await getUserPasswords(userId);

    res.json(passwords);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
