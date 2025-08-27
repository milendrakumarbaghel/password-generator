import { Request, Response } from "express";
import { generateRandomPassword } from "../utils/passwordUtils";
import prisma from "../config/db";
import { CustomRequest } from "../utils/types"; // Importing a single source of truth for CustomRequest

export const generatePassword = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
  const { length, includeUppercase, includeNumbers, includeSpecialChars, description } = req.body;

    // Validate input parameters
    if (!length || typeof length !== "number" || length < 6) {
      res.status(400).json({ error: "Invalid length. Must be a number and at least 6 characters." });
      return;
    }

    if (typeof includeUppercase !== "boolean" || typeof includeNumbers !== "boolean" || typeof includeSpecialChars !== "boolean") {
      res.status(400).json({ error: "Invalid input. IncludeUppercase, IncludeNumbers, and IncludeSpecialChars must be boolean values." });
      return;
    }

    // Require non-empty description
    if (typeof description !== "string" || description.trim().length === 0) {
      res.status(400).json({ error: "Description is required and must be a non-empty string." });
      return;
    }

    // Generate password dynamically based on request parameters
    const password = generateRandomPassword(length, includeUppercase, includeNumbers, includeSpecialChars);

    // Store the generated password in the database (Optional)
    if (req.user && req.user.id) {
    await prisma.passwordHistory.create({
        data: {
          userId: req.user.id,
          password,
          description: description.trim(),
        },
      });
    }

  res.status(201).json({ password });
  } catch (error) {
    console.error("Error generating password:", error);
    res.status(500).json({ error: "Failed to generate password" });
  }
};

export const getPasswordHistory = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    console.log("Request User:", req.user); // Debugging

    if (!req.user || !req.user.id) {
      console.log("User not found or unauthorized");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    console.log(`Fetching history for user ID: ${userId}`);

    const history = await prisma.passwordHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, password: true, description: true, createdAt: true },
    });

    res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching password history:", error);
    res.status(500).json({ error: "Failed to retrieve history" });
  }
};
