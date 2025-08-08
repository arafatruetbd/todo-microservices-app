import { DataSource } from "typeorm";
import { User } from "../entity/User";

// Initialize and export the TypeORM DataSource instance.
// This sets up the connection configuration to the PostgreSQL database,
// including host, port, username, password, database name, and the entity models to use.
// The `synchronize: true` option automatically syncs database schema with entity definitions (use with caution in production).
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5440"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "user_db",
  entities: [User],
  synchronize: true,
});
