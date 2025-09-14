// src/server.ts
import "reflect-metadata";
import { AppDataSource } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 5001;

// ✅ Connect to DB and Start Server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to Todo DB");
    app.listen(PORT, () => {
      console.log(`🚀 Todo service running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB init error:", error);
    process.exit(1); // Exit if DB connection fails
  });
