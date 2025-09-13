import { test, expect } from "@playwright/test";

test("full flow: register → login → CRUD todos", async ({ request }) => {
  // Use a unique email each run to avoid conflicts
  const email = `user${Date.now()}@test.com`;
  const password = "secret123";

  // 1) Register a user
  const registerRes = await request.post(
    "http://localhost:5000/user/api/auth/register",
    {
      data: { email, password },
    }
  );
  expect(registerRes.ok()).toBeTruthy();

  // 2) Login and get JWT
  const loginRes = await request.post(
    "http://localhost:5000/user/api/auth/login",
    {
      data: { email, password },
    }
  );
  expect(loginRes.ok()).toBeTruthy();

  const { token } = await loginRes.json();
  expect(token).toBeTruthy();

  const headers = { Authorization: `Bearer ${token}` };

  // 3) Create a todo
  const createRes = await request.post("http://localhost:5001/api/todo", {
    data: { content: "Buy milk" },
    headers,
  });
  expect(createRes.status()).toBe(201);
  const todo = await createRes.json();
  expect(todo.content).toBe("Buy milk");

  // 4) Read todos
  const listRes = await request.get("http://localhost:5001/api/todo", {
    headers,
  });
  expect(listRes.status()).toBe(200);
  const todos = await listRes.json();
  expect(todos.some((t: any) => t.content === "Buy milk")).toBe(true);

  // 5) Update todo
  const updateRes = await request.put(
    `http://localhost:5001/api/todo/${todo.uuid}`,
    {
      data: { content: "Buy almond milk" },
      headers,
    }
  );
  expect(updateRes.status()).toBe(200);
  const updated = await updateRes.json();
  expect(updated.content).toBe("Buy almond milk");

  // 6) Delete todo
  const deleteRes = await request.delete(
    `http://localhost:5001/api/todo/${todo.uuid}`,
    {
      headers,
    }
  );
  expect(deleteRes.status()).toBe(204);

  // 7) Confirm deletion
  const finalList = await request.get("http://localhost:5001/api/todo", {
    headers,
  });
  expect(finalList.status()).toBe(200);
  const finalTodos = await finalList.json();
  expect(finalTodos.some((t: any) => t.uuid === todo.uuid)).toBe(false);
});
