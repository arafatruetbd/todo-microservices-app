// Router setup for Todo endpoints with authentication middleware applied
// All routes require a valid authenticated user
// Routes:
//   POST "/"       - Create a new todo
//   GET "/"        - Retrieve todos for authenticated user
//   PUT "/:uuid"   - Update a todo by its UUID
//   DELETE "/:uuid" - Delete a todo by its UUID

import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:uuid", updateTodo);
router.delete("/:uuid", deleteTodo);

export default router;
