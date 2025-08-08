import { getTodos } from "../controllers/todoController";
import { UnauthorizedError } from "../helper/error";
import { getTodoRepo } from "../helper/todoRepository";

jest.mock("../helper/todoRepository");

describe("getTodos", () => {
  let mockRepo: any;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };
    (getTodoRepo as jest.Mock).mockReturnValue(mockRepo);

    req = {
      user: { user_uuid: "user-123" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should return 200 with the user's todos", async () => {
    const todos = [
      { uuid: "todo-1", content: "Task 1", user_uuid: "user-123" },
      { uuid: "todo-2", content: "Task 2", user_uuid: "user-123" },
    ];
    mockRepo.find.mockResolvedValue(todos);

    await getTodos(req, res, next);

    expect(mockRepo.find).toHaveBeenCalledWith({
      where: { user_uuid: "user-123" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(todos);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 200 with an empty array if no todos", async () => {
    mockRepo.find.mockResolvedValue([]);

    await getTodos(req, res, next);

    expect(mockRepo.find).toHaveBeenCalledWith({
      where: { user_uuid: "user-123" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with UnauthorizedError if user is missing (JWT missing or invalid)", async () => {
    req.user = undefined; // simulate missing user

    await getTodos(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(UnauthorizedError);

    // Controller should NOT call res.status or res.json here
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
