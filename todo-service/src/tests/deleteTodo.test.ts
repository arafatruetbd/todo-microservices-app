import { deleteTodo } from "../controllers/todoController";
import { getTodoRepo } from "../helper/todoRepository";

jest.mock("../helper/todoRepository");

describe("deleteTodo", () => {
  let mockRepo: any;
  let req: any;
  let res: any;

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
    mockRepo.remove.mockResolvedValue(undefined); // usually remove returns void or undefined

    await deleteTodo(req, res);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(mockRepo.remove).toHaveBeenCalledWith(todo);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("should return 404 if todo does not exist", async () => {
    req = {
      params: { uuid: "todo-123" },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(null);

    await deleteTodo(req, res);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
  });

  it("should return 403 if user does not own the todo", async () => {
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

    await deleteTodo(req, res);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
  });
});
