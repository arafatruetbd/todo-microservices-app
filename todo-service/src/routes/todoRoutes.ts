import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:uuid", updateTodo);
router.delete("/:uuid", deleteTodo);

export default router;
