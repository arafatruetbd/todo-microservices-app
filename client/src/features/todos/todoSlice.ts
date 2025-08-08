// src/features/todo/slices/todoSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoUIState } from "./types";


const initialState: TodoUIState = {
  selectedTodoId: null,
};

const todoSlice = createSlice({
  name: "todoUI",
  initialState,
  reducers: {
    selectTodo: (state, action: PayloadAction<string | null>) => {
      state.selectedTodoId = action.payload;
    },
  },
});

export const { selectTodo } = todoSlice.actions;
export default todoSlice.reducer;
