import { createTodo } from "../controllers/todoController";
import { UnauthorizedError } from "../helper/error";
import { getTodoRepo } from "../helper/todoRepository";

jest.mock("../helper/todoRepository");

describe("createTodo", () => {
  let mockRepo: any;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    // Mock the helper to return the mocked repository
    (getTodoRepo as jest.Mock).mockReturnValue(mockRepo);

    req = {
      body: { content: "Test todo" },
      user: { user_uuid: "user-123" }, // normally set by auth middleware
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should create a todo with authenticated user's uuid and return 201", async () => {
    const createdTodo = {
      uuid: "todo-456",
      content: "Test todo",
      user_uuid: "user-123",
    };

    mockRepo.create.mockReturnValue(createdTodo);
    mockRepo.save.mockResolvedValue(createdTodo);

    await createTodo(req, res, next);

    expect(mockRepo.create).toHaveBeenCalledWith({
      content: "Test todo",
      user_uuid: "user-123",
    });
    expect(mockRepo.save).toHaveBeenCalledWith(createdTodo);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdTodo);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with UnauthorizedError if user is missing (JWT missing or invalid)", async () => {
    req.user = undefined; // or req.user = {}

    await createTodo(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(UnauthorizedError);

    // The controller should NOT call res.status or res.json here
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
