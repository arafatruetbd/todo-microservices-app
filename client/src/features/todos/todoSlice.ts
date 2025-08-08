// src/features/todo/slices/todoSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoUIState } from "./types";

/**
 * UI-related state for the Todo feature.
 *
 * This slice only manages UI behavior for todos,
 * such as which todo item is currently selected.
 */
const initialState: TodoUIState = {
  // The ID of the currently selected todo, or null if none is selected.
  selectedTodoId: null,
};

const todoSlice = createSlice({
  name: "todoUI", // Slice name, used as the key in Redux state
  initialState,
  reducers: {
    /**
     * Sets the currently selected todo ID.
     *
     * @param state - The current slice state
     * @param action - The payload containing the selected todo ID or null
     */
    selectTodo: (state, action: PayloadAction<string | null>) => {
      state.selectedTodoId = action.payload;
    },
  },
});

// Export the action to be used in components
export const { selectTodo } = todoSlice.actions;

// Export the reducer to be included in the store
export default todoSlice.reducer;
