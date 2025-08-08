import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helper/error";

// Centralized Express error-handling middleware.
// Catches errors thrown from anywhere in the app and sends appropriate HTTP responses.
//
// If the error is an instance of HttpError (custom error with status),
// sends the corresponding status code and message as JSON.
//
// For unexpected errors (not HttpError), logs the error and
// returns a 500 Internal Server Error with a generic message.
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err); // Log unexpected errors for debugging
  res.status(500).json({ message: "Internal Server Error" });
}
