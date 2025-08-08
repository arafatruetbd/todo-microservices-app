import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";

// Controller function to handle user registration
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Call the service function to register user and generate token
    const token = await registerUser(email, password);

    // Respond with HTTP 201 Created and the token
    res.status(201).json({ token });
  } catch (error) {
    // Pass any errors to centralized error handling middleware
    next(error);
  }
};

// Controller function to handle user login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Call the service function to login user and generate token
    const token = await loginUser(email, password);

    // Respond with HTTP 200 OK and the token
    res.status(200).json({ token });
  } catch (error) {
    // Pass any errors to centralized error handling middleware
    next(error);
  }
};
