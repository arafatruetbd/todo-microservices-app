import { login } from "../controllers/authController";
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

describe("login", () => {
  let mockRepo: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockRepo = {
      findOneBy: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwtUtils.generateToken as jest.Mock).mockReturnValue("fake-token");
  });

  it("should return 401 if user not found", async () => {
    req.body = { email: "notfound@example.com", password: "password123" };
    mockRepo.findOneBy.mockResolvedValue(null);

    const next = jest.fn();
    await login(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(401);
    expect(error.message).toBe("Invalid credentials");
  });

  it("should return 401 if password is invalid", async () => {
    req.body = { email: "user@example.com", password: "wrongpassword" };
    mockRepo.findOneBy.mockResolvedValue({
      user_email: "user@example.com",
      user_pwd: "hashedPassword",
      uuid: "uuid-123",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const next = jest.fn();
    await login(req, res, next);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrongpassword",
      "hashedPassword"
    );

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(401);
    expect(error.message).toBe("Invalid credentials");
  });

  it("should return 200 and token if credentials are valid", async () => {
    req.body = { email: "user@example.com", password: "correctpassword" };
    mockRepo.findOneBy.mockResolvedValue({
      user_email: "user@example.com",
      user_pwd: "hashedPassword",
      uuid: "uuid-123",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwtUtils.generateToken as jest.Mock).mockReturnValue("fake-token");

    await login(req, res, jest.fn());

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "correctpassword",
      "hashedPassword"
    );
    expect(jwtUtils.generateToken).toHaveBeenCalledWith({
      user_uuid: "uuid-123",
      email: "user@example.com",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "fake-token" });
  });
});
