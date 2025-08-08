import { updateTodo } from "../controllers/todoController";
import { getTodoRepo } from "../helper/todoRepository";

jest.mock("../helper/todoRepository");

describe("updateTodo", () => {
  let mockRepo: any;
  let req: any;
  let res: any;

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

    await updateTodo(req, res);

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
  });

  it("should return 404 if todo does not exist", async () => {
    req = {
      params: { uuid: "todo-123" },
      body: { content: "Anything" },
      user: { user_uuid: "user-123" },
    };

    mockRepo.findOneBy.mockResolvedValue(null);

    await updateTodo(req, res);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
  });

  it("should return 403 if user does not own the todo", async () => {
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

    await updateTodo(req, res);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ uuid: "todo-123" });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
  });
});
