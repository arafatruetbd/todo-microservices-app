// src/server.ts
import "reflect-metadata";
import { AppDataSource } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 5000;

// ✅ Connect to DB and Start Server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to User DB");
    app.listen(PORT, () => {
      console.log(`🚀 User service running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB init error:", error);
    process.exit(1); // Exit if DB connection fails
  });
