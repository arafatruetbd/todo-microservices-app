import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithAuth } from "@/features/api/baseQueryWithAuth";
import type { CreateTodoRequest, Todo } from "./types";

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: createBaseQueryWithAuth("http://localhost:5001/api"),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todo",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (newTodo) => ({
        url: "/todo",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<Todo, { uuid: string; content: string }>({
      query: ({ uuid, content }) => ({
        url: `/todo/${uuid}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (uuid) => ({
        url: `/todo/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoAPI;
