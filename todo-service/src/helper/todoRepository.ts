import { AppDataSource } from "../db";
import { Todo } from "../entity/Todo";

export const getTodoRepo = () => AppDataSource.getRepository(Todo);
