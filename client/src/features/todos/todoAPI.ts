import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithAuth } from "@/features/api/baseQueryWithAuth";
import type { CreateTodoRequest, Todo } from "./types";

// Create a Todo API slice using RTK Query
export const todoAPI = createApi({
  // Unique key for the reducer in the store
  reducerPath: "todoAPI",

  // Base query function that automatically includes authentication headers
  baseQuery: createBaseQueryWithAuth("http://localhost:5001/api"),

  // Tag types used for automatic cache invalidation
  tagTypes: ["Todo"],

  // Define API endpoints
  endpoints: (builder) => ({
    // Fetch all todos
    getTodos: builder.query<Todo[], string | undefined>({
      query: () => "/todo",
      providesTags: ["Todo"], // Cache key for automatic refetching
    }),

    // Create a new todo
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (newTodo) => ({
        url: "/todo",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"], // Invalidate cache to trigger refetch
    }),

    // Update a todo's content
    updateTodo: builder.mutation<Todo, { uuid: string; content: string }>({
      query: ({ uuid, content }) => ({
        url: `/todo/${uuid}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Todo"], // Invalidate cache to update UI
    }),

    // Delete a todo by UUID
    deleteTodo: builder.mutation<void, string>({
      query: (uuid) => ({
        url: `/todo/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"], // Invalidate cache to remove from UI
    }),
  }),
});

// Export auto-generated hooks for each endpoint
export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoAPI;
