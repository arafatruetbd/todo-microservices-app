import { describe, it, expect } from "vitest";
import reducer, { selectTodo } from "../todoSlice";
import type { TodoUIState } from "../types";

describe("todoSlice", () => {
  const initialState: TodoUIState = {
    selectedTodoId: null,
  };

  it("should return the initial state when passed an empty action", () => {
    const result = reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should handle selectTodo with a todo ID", () => {
    const result = reducer(initialState, selectTodo("123"));
    expect(result.selectedTodoId).toBe("123");
  });

  it("should handle selectTodo with null", () => {
    const startState: TodoUIState = { selectedTodoId: "456" };
    const result = reducer(startState, selectTodo(null));
    expect(result.selectedTodoId).toBeNull();
  });
});
