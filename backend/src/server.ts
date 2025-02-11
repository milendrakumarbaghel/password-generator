import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Function to check database connection
const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL:", error);
    process.exit(1); // Exit process on failure
  }
};

// Call the test function
testDatabaseConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
