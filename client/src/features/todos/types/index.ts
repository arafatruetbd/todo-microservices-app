export interface Todo {
  uuid: string;
  content: string;
  user_uuid: string;
}

export interface CreateTodoRequest {
  content: string;
}

export interface TodoUIState {
  selectedTodoId: string | null;
}
