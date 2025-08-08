import { deleteTodo } from "../controllers/todoController";
import { getTodoRepo } from "../helper/todoRepository";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "../helper/error";

jest.mock("../helper/todoRepository");

describe("deleteTodo", () => {
  let mockRepo: any;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockRepo = {
      findOneBy: jest.fn(),
      remove: jest.fn(),
    };
    (getTodoRepo as jest.Mock).mockReturnValue(mockRepo);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    next = jest.fn();
  });

  it("should delete todo if user owns it and return 204", async () => {
    const todo = {
      uuid: "todo-123",
      user_uuid: "user-123",
      content: "Task",
    };

    req = {
      params: { uuid: "todo-123" },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(todo);
    mockRepo.remove.mockResolvedValue(undefined);

    await deleteTodo(req, res, next);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(mockRepo.remove).toHaveBeenCalledWith(todo);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with NotFoundError if todo does not exist", async () => {
    req = {
      params: { uuid: "todo-123" },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(null);

    await deleteTodo(req, res, next);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should call next with ForbiddenError if user does not own the todo", async () => {
    const todo = {
      uuid: "todo-123",
      user_uuid: "user-456", // different user
      content: "Task",
    };

    req = {
      params: { uuid: "todo-123" },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(todo);

    await deleteTodo(req, res, next);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  // New test case for missing or invalid JWT
  it("should call next with UnauthorizedError if user is missing (JWT missing or invalid)", async () => {
    req = {
      params: { uuid: "todo-123" },
      user: undefined, // simulate missing user
    };

    await deleteTodo(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(UnauthorizedError);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
