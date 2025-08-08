import { Request, Response } from "express";
import { getTodoRepo } from "../helper/todoRepository";

export const createTodo = async (req: Request, res: Response) => {
  const { content } = req.body;
  const { user_uuid } = (req as any).user;

  const repo = getTodoRepo();

  const todo = repo.create({ content, user_uuid });
  await repo.save(todo);

  res.status(201).json(todo);
};

export const getTodos = async (req: Request, res: Response) => {
  const { user_uuid } = (req as any).user;
  const repo = getTodoRepo();
  const todos = await repo.find({ where: { user_uuid } });
  res.status(200).json(todos);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { content } = req.body;
  const { user_uuid } = (req as any).user;
  const repo = getTodoRepo();
  const todo = await repo.findOneBy({ uuid });

  if (!todo) return res.status(404).json({ message: "Not found" });
  if (todo.user_uuid !== user_uuid)
    return res.status(403).json({ message: "Forbidden" });

  todo.content = content;
  await repo.save(todo);

  res.status(200).json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { user_uuid } = (req as any).user;
  const repo = getTodoRepo();
  const todo = await repo.findOneBy({ uuid });

  if (!todo) return res.status(404).json({ message: "Not found" });
  if (todo.user_uuid !== user_uuid)
    return res.status(403).json({ message: "Forbidden" });

  await repo.remove(todo);
  res.status(204).send();
};
