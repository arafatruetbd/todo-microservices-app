// Returns the repository for the Todo entity from the TypeORM DataSource
// This repository provides all CRUD operations for Todo records in the database
import { AppDataSource } from "../config/db";
import { Todo } from "../entity/Todo";

export const getTodoRepo = () => AppDataSource.getRepository(Todo);
