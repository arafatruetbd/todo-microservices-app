import { register } from "../controllers/authController";
import { AppDataSource } from "../config/db";
import bcrypt from "bcryptjs";
import * as jwtUtils from "../utils/jwt";

jest.mock("../config/db", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock("bcryptjs");
jest.mock("../utils/jwt.ts");

describe("register", () => {
  let mockRepo: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockRepo = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (jwtUtils.generateToken as jest.Mock).mockReturnValue("fake-token");
  });

  it("should return 400 if email missing or password too short", async () => {
    req.body = { email: "", password: "123" };

    const next = jest.fn();
    await register(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(400);
    expect(error.message).toBe("Invalid input: provide a valid email and a password with at least 6 characters");
  });

  it("should return 409 if email already exists", async () => {
    req.body = { email: "test@example.com", password: "123456" };
    mockRepo.findOneBy.mockResolvedValue({ user_email: "test@example.com" });

    const next = jest.fn();
    await register(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(409);
    expect(error.message).toBe("Email in use");
  });

  it("should create user, hash password and return token", async () => {
    req.body = { email: "new@example.com", password: "123456" };
    mockRepo.findOneBy.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({
      user_email: "new@example.com",
      user_pwd: "hashedPassword",
    });
    mockRepo.save.mockResolvedValue({
      uuid: "uuid-123",
      user_email: "new@example.com",
    });

    await register(req, res, jest.fn());

    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
    expect(mockRepo.create).toHaveBeenCalledWith({
      user_email: "new@example.com",
      user_pwd: "hashedPassword",
    });
    expect(mockRepo.save).toHaveBeenCalled();
    expect(jwtUtils.generateToken).toHaveBeenCalledWith({
      user_uuid: "uuid-123",
      email: "new@example.com",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ token: "fake-token" });
  });
});
