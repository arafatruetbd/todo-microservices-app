import { AppDataSource } from "../config/db";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../helper/error";

/**
 * Registers a new user
 * @param email - User's email address
 * @param password - User's plain-text password
 * @returns JWT token for the newly registered user
 */
export const registerUser = async (email: string, password: string) => {
  // Validate input: must be a valid email, password at least 6 chars
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic RFC 5322 compliant check
  if (!email || !emailRegex.test(email) || password.length < 6) {
    throw new BadRequestError(
      "Invalid input: provide a valid email and a password with at least 6 characters"
    );
  }

  // Get repository for User entity
  const repo = AppDataSource.getRepository(User);

  // Check if the email is already in use
  const existing = await repo.findOneBy({ user_email: email });
  if (existing) {
    throw new ConflictError("Email in use");
  }

  // Hash the password before saving
  const hash = await bcrypt.hash(password, 10);

  // Create a new user entity
  const user = repo.create({ user_email: email, user_pwd: hash });

  // Save the user to the database
  const savedUser = await repo.save(user);

  // Generate a JWT token for authentication
  const token = generateToken({
    user_uuid: savedUser.uuid,
    email: savedUser.user_email,
  });

  return token;
};

/**
 * Logs in an existing user
 * @param email - User's email address
 * @param password - User's plain-text password
 * @returns JWT token if login is successful
 */
export const loginUser = async (email: string, password: string) => {
  // Get repository for User entity
  const repo = AppDataSource.getRepository(User);

  // Find the user by email
  const user = await repo.findOneBy({ user_email: email });

  // If no user found, throw Unauthorized error
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // Compare provided password with stored hashed password
  const valid = await bcrypt.compare(password, user.user_pwd);
  if (!valid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // Generate a JWT token for authentication
  const token = generateToken({
    user_uuid: user.uuid,
    email: user.user_email,
  });

  return token;
};
