/**
 * Service layer for Todo-related business logic.
 * Each function interacts with the database repository and
 * handles errors by throwing custom exceptions.
 */

import { getTodoRepo } from "../helper/todoRepository";
import { NotFoundError, ForbiddenError } from "../helper/error";

/**
 * Creates a new Todo item for a given user.
 * @param user_uuid - UUID of the user creating the todo
 * @param content - Text content of the todo
 * @returns The newly created Todo entity
 */
export const createTodoService = async (user_uuid: string, content: string) => {
  const repo = getTodoRepo();
  const todo = repo.create({ content, user_uuid });
  return await repo.save(todo);
};

/**
 * Retrieves all Todo items for a specific user.
 * @param user_uuid - UUID of the user
 * @returns Array of Todo entities belonging to the user
 */
export const getTodosService = async (user_uuid: string) => {
  const repo = getTodoRepo();
  return await repo.find({ where: { user_uuid } });
};

/**
 * Updates the content of an existing Todo if it belongs to the user.
 * Throws NotFoundError if the todo does not exist.
 * Throws ForbiddenError if the todo belongs to another user.
 * @param uuid - UUID of the Todo to update
 * @param user_uuid - UUID of the user attempting the update
 * @param content - New content for the Todo
 * @returns The updated Todo entity
 */
export const updateTodoService = async (
  uuid: string,
  user_uuid: string,
  content: string
) => {
  const repo = getTodoRepo();
  const todo = await repo.findOneBy({ uuid });

  if (!todo) throw new NotFoundError("Todo not found");
  if (todo.user_uuid !== user_uuid) throw new ForbiddenError("Access denied");

  todo.content = content;
  return await repo.save(todo);
};

/**
 * Deletes a Todo if it exists and belongs to the user.
 * Throws NotFoundError if the todo does not exist.
 * Throws ForbiddenError if the todo belongs to another user.
 * @param uuid - UUID of the Todo to delete
 * @param user_uuid - UUID of the user attempting the deletion
 */
export const deleteTodoService = async (uuid: string, user_uuid: string) => {
  const repo = getTodoRepo();
  const todo = await repo.findOneBy({ uuid });

  if (!todo) throw new NotFoundError("Todo not found");
  if (todo.user_uuid !== user_uuid) throw new ForbiddenError("Access denied");

  await repo.remove(todo);
  return;
};
