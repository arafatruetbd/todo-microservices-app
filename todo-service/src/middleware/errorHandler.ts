// Centralized error handling middleware for Express
// Catches thrown errors and sends appropriate HTTP response codes and messages
// Supports custom NotFoundError and ForbiddenError classes with specific status codes
// Logs unexpected errors to the console and returns a generic 500 Internal Server Error

import { Request, Response, NextFunction } from "express";
import { NotFoundError, ForbiddenError } from "../helper/error";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(403).json({ message: err.message });
  }

  console.error(err); // Log for debugging
  res.status(500).json({ message: "Internal Server Error" });
}
