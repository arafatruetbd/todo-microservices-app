import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
