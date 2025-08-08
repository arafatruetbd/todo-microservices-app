import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "@/features/todos/todoAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/features/auth/authSlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../shared/LoadingSpinner";
import Error from "../shared/Error";
import Button from "../shared/Button";

export default function Todos() {
  const dispatch = useDispatch();

  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  const [newTodoContent, setNewTodoContent] = useState("");
  const [editingUuid, setEditingUuid] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const handleDelete = async (uuid: string) => {
    try {
      await deleteTodo(uuid).unwrap();
      toast.success("Todo deleted");
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  const startEdit = (uuid: string, content: string) => {
    setEditingUuid(uuid);
    setEditingContent(content);
  };

  const cancelEdit = () => {
    setEditingUuid(null);
    setEditingContent("");
  };

  const saveEdit = async () => {
    if (!editingContent.trim()) {
      toast.error("Todo content cannot be empty");
      return;
    }
    try {
      if (editingUuid) {
        await updateTodo({
          uuid: editingUuid,
          content: editingContent,
        }).unwrap();
        toast.success("Todo updated");
        setEditingUuid(null);
        setEditingContent("");
      }
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const handleAddTodo = async () => {
    if (!newTodoContent.trim()) {
      toast.error("Todo content cannot be empty");
      return;
    }
    try {
      await createTodo({ content: newTodoContent }).unwrap();
      toast.success("Todo added");
      setNewTodoContent("");
    } catch {
      toast.error("Failed to add todo");
    }
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    toast.success("Logged out successfully");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <Error message="Failed to load todos. Please try again later." />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Todos</h1>
        <Button onClick={handleLogout} variant="logout">
          Logout
        </Button>
      </div>

      {/* Add Todo Input & Button */}
      <div className="flex mb-6 space-x-3">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isCreating}
        />
        <Button onClick={handleAddTodo} loading={isCreating}>
          {isCreating ? "Adding..." : "Add"}
        </Button>
      </div>

      <ul className="space-y-5">
        {todos?.map((todo) => (
          <li
            key={todo.uuid}
            className="flex items-center justify-between bg-white shadow-md p-5 rounded-xl hover:shadow-lg transition-shadow"
          >
            {editingUuid === todo.uuid ? (
              <>
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
                />
                <div className="flex space-x-3">
                  <Button
                    onClick={saveEdit}
                    variant="success"
                    loading={isUpdating}
                  >
                    Save
                  </Button>

                  <Button onClick={cancelEdit} variant="cancel">
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span className="text-gray-800 text-lg flex-grow break-words overflow-wrap-break-word">
                  {todo.content}
                </span>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => startEdit(todo.uuid, todo.content)}
                    variant="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(todo.uuid)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
