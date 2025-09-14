// src/server.ts
import "reflect-metadata";
import { AppDataSource } from "./config/db";
import app from "./app";

const PORT = Number(process.env.PORT) || 5001;

// ✅ Connect to DB and Start Server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to Todo DB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Todo service running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB init error:", error);
    process.exit(1); // Exit if DB connection fails
  });
