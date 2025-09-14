// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());

// ✅ Add health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});
// ✅ Routes
app.use("/user/api/auth", authRoutes);
// centralized error handling middleware comes last
app.use(errorHandler);

export default app;
