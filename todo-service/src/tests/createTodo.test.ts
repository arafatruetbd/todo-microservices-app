import { createTodo } from "../controllers/todoController";
import { getTodoRepo } from "../helper/todoRepository";

jest.mock("../helper/todoRepository");

describe("createTodo", () => {
  let mockRepo: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    // Mock the helper to return the mocked repository
    (getTodoRepo as jest.Mock).mockReturnValue(mockRepo);

    req = {
      body: { content: "Test todo" },
      user: { user_uuid: "user-123" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a todo with authenticated user's uuid and return 201", async () => {
    const createdTodo = {
      uuid: "todo-456",
      content: "Test todo",
      user_uuid: "user-123",
    };

    mockRepo.create.mockReturnValue(createdTodo);
    mockRepo.save.mockResolvedValue(createdTodo);

    await createTodo(req, res, jest.fn());

    expect(mockRepo.create).toHaveBeenCalledWith({
      content: "Test todo",
      user_uuid: "user-123",
    });
    expect(mockRepo.save).toHaveBeenCalledWith(createdTodo);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdTodo);
  });
});
