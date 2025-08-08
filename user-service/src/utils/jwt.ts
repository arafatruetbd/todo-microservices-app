import jwt from "jsonwebtoken";

// Secret key for signing JWT tokens. In production, always set this in an environment variable.
// Fallback to "default_secret" if not set (not recommended for production).
const secret = process.env.JWT_SECRET || "default_secret";

/**
 * Generates a JSON Web Token (JWT) for authentication.
 * 
 * @param payload - The data to embed in the token (e.g., user ID, email).
 * @returns A signed JWT string with a 1-hour expiration.
 */
export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
