import { Request, Response, NextFunction } from "express";
import {
  createTodoService,
  getTodosService,
  updateTodoService,
  deleteTodoService,
} from "../services/todoService";

// Controller to handle creating a new todo item.
// Extracts content from request body and user_uuid from the authenticated user.
// Calls the service layer and sends back the created todo with status 201.
// Errors are passed to the next middleware (error handler).
export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    const { user_uuid } = (req as any).user;
    const todo = await createTodoService(user_uuid, content);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// Controller to fetch all todos for the authenticated user.
// Calls the service layer and returns the list of todos with status 200.
// Errors forwarded to the error handler middleware.
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_uuid } = (req as any).user;
    const todos = await getTodosService(user_uuid);
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

// Controller to update a todo by its uuid for the authenticated user.
// Retrieves uuid from route params and content from request body.
// Delegates to service layer and returns the updated todo.
// Any errors are passed to the error handler.
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid } = req.params;
    const { content } = req.body;
    const { user_uuid } = (req as any).user;
    const updatedTodo = await updateTodoService(uuid, user_uuid, content);
    res.status(200).json(updatedTodo);
  } catch (err) {
    next(err);
  }
};

// Controller to delete a todo by its uuid for the authenticated user.
// Calls the service layer and returns a 204 No Content on success.
// Passes any errors to the error handler.
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid } = req.params;
    const { user_uuid } = (req as any).user;
    await deleteTodoService(uuid, user_uuid);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
