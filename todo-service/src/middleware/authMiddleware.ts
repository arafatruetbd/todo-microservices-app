// Middleware to authenticate requests using JWT tokens
// Checks for the Authorization header and verifies the token using the secret key
// If valid, attaches the decoded token payload (user info) to the request object and calls next()
// Otherwise, responds with 401 Unauthorized status and error message

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
