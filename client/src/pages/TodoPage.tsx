// src/pages/TodoPage.tsx
import Todos from "@/components/todos/Todos";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function TodoPage() {
  return (
    <PrivateRoute>
      <Todos />
    </PrivateRoute>
  );
}
