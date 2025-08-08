import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import authRoutes from "./routes/authRoutes";
import { AppDataSource } from "./db";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

// ✅ Allow CORS
app.use(
  cors({
    origin: "http://localhost:3000", // allow frontend
    credentials: true, // allow cookies if needed
  })
);
app.use(express.json());
app.use("/user/api/auth", authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to User DB");
    app.listen(PORT, () => {
      console.log(`User service running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("DB init error:", error));
