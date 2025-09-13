import { test, expect } from "@playwright/test";

test("Client flow: signup → login → manage todos", async ({ page }) => {
  const email = `user${Date.now()}@test.com`;
  const password = "secret123";

  // 1) Go to signup page
  await page.goto("http://localhost:3000/signup");

  // Fill signup form
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  await page.click('button[type="submit"]');

  // Expect redirect to /todos
  await expect(page).toHaveURL(/.*\/todos/);
  await expect(page.locator("h1")).toHaveText("Your Todos");

  // 2) Add a todo
  await page.fill('input[placeholder="Add a new todo..."]', "Buy milk");
  await page.click("button:has-text('Add')");
  await expect(page.locator("li")).toContainText("Buy milk");

  // 3) Edit the todo
  await page.click("button:has-text('Edit')");
  const editInput = page.locator('input[type="text"]').last();
  await editInput.fill("Buy almond milk");
  await page.click("button:has-text('Save')");
  await expect(page.locator("li")).toContainText("Buy almond milk");

  // 4) Delete the todo
  await page.click("button:has-text('Delete')");
  await expect(page.getByText("Buy almond milk")).toHaveCount(0);

  // 5) Logout
  await page.click("button:has-text('Logout')");
  await expect(page).toHaveURL(/.*\/signin/);
});
