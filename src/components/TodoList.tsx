import { Todo } from "@/interfaces";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, onToggleTodo, onDeleteTodo }: Props) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </section>
  );
};
