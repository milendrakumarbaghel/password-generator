import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../utils/types";

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return; // ✅ Ensure function exits
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = { id: decoded.userId };
    next(); // ✅ Correctly call next()
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return; // ✅ Ensure function exits
  }
};

export default authMiddleware;
