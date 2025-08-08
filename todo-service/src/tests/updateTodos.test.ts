import { updateTodo } from "../controllers/todoController";
import { getTodoRepo } from "../helper/todoRepository";
import { NotFoundError, ForbiddenError } from "../helper/error";

jest.mock("../helper/todoRepository");

describe("updateTodo", () => {
  let mockRepo: any;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockRepo = {
      findOneBy: jest.fn(),
      save: jest.fn(),
    };
    (getTodoRepo as jest.Mock).mockReturnValue(mockRepo);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should update todo if user owns it and return 200", async () => {
    const existingTodo = {
      uuid: "todo-123",
      content: "Old content",
      user_uuid: "user-123",
    };
    const updatedContent = "New content";

    req = {
      params: { uuid: "todo-123" },
      body: { content: updatedContent },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(existingTodo);
    mockRepo.save.mockImplementation(async (todo: any) => todo);

    await updateTodo(req, res, next);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(mockRepo.save).toHaveBeenCalledWith({
      ...existingTodo,
      content: updatedContent,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ...existingTodo,
      content: updatedContent,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with NotFoundError if todo does not exist", async () => {
    req = {
      params: { uuid: "todo-123" },
      body: { content: "Anything" },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(null);

    await updateTodo(req, res, next);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should call next with ForbiddenError if user does not own the todo", async () => {
    const existingTodo = {
      uuid: "todo-123",
      content: "Old content",
      user_uuid: "user-456", // different user
    };

    req = {
      params: { uuid: "todo-123" },
      body: { content: "New content" },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(existingTodo);

    await updateTodo(req, res, next);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
