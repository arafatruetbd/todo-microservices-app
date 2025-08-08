import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./db";
import todoRoutes from "./routes/todoRoutes";
import cors from "cors";

const app = express();
const PORT = 5001;

// ✅ Allow CORS
app.use(
  cors({
    origin: "http://localhost:3000", // allow frontend
    credentials: true, // allow cookies if needed
  })
);
app.use(express.json());
app.use("/api/todo", todoRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Todo DB");
    app.listen(PORT, () => {
      console.log(`Todo service running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("DB init error:", error));
