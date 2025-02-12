import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import passwordRoutes from "./routes/passwordRoutes";
import prisma from "./config/db";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;

// Routes
app.use("/auth", authRoutes);
app.use("/password", passwordRoutes);

// // Function to check database connection
// const testDatabaseConnection = async () => {
//   try {
//     await prisma.$connect();
//     console.log("✅ Connected to PostgreSQL successfully!");
//   } catch (error) {
//     console.error("❌ Failed to connect to PostgreSQL:", error);
//     process.exit(1); // Exit process on failure
//   }
// };

// Call the test function
// testDatabaseConnection();

// Test database connection
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({ message: "Connected to PostgreSQL 🎉" });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
