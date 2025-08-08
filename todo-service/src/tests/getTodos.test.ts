import { getTodos } from "../controllers/todoController";
import { getTodoRepo } from "../helper/todoRepository";

jest.mock("../helper/todoRepository");

describe("getTodos", () => {
  let mockRepo: any;
  let req: any;
  let res: any;

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
  });

  it("should return 200 with the user's todos", async () => {
    const todos = [
      { uuid: "todo-1", content: "Task 1", user_uuid: "user-123" },
      { uuid: "todo-2", content: "Task 2", user_uuid: "user-123" },
    ];
    mockRepo.find.mockResolvedValue(todos);

    await getTodos(req, res, jest.fn());

    expect(mockRepo.find).toHaveBeenCalledWith({
      where: { user_uuid: "user-123" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(todos);
  });

  it("should return 200 with an empty array if no todos", async () => {
    mockRepo.find.mockResolvedValue([]);

    await getTodos(req, res, jest.fn());

    expect(mockRepo.find).toHaveBeenCalledWith({
      where: { user_uuid: "user-123" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });
});
