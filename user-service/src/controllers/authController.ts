import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || password.length < 6)
    return res.status(400).json({ message: "Invalid input" });

  const repo = AppDataSource.getRepository(User);
  const existing = await repo.findOneBy({ user_email: email });
  if (existing) return res.status(409).json({ message: "Email in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = repo.create({ user_email: email, user_pwd: hash });
  const savedUser = await repo.save(user);

  const token = generateToken({
    user_uuid: savedUser.uuid,
    email: savedUser.user_email,
  });

  return res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ user_email: email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.user_pwd);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken({ user_uuid: user.uuid, email: user.user_email });

  return res.status(200).json({ token });
};
