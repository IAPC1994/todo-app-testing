import { Todo } from "@/interfaces";
import clsx from "clsx";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }: Props) => {
  const { id, title, completed } = todo;
  return (
    <div className="flex items-center gap-2 bg-indigo-700 p-4 shadow-md rounded-lg">
      <input
        type="checkbox"
        className="w-5 h-5 md:w-8 md:h-8 accent-emerald-600 cursor-pointer"
        checked={completed}
        onChange={() => onToggleTodo(id)}
      />
      <p
        className={clsx("text-base md:text-xl flex-1", {
          "line-through text-gray-400": completed,
        })}
      >
        {title}
      </p>
      <button
        type="button"
        onClick={() => onDeleteTodo(id)}
        className="p-2 border rounded-lg shadow-md bg-red-500 hover:bg-red-600 cursor-pointer"
      >
        <IoTrashOutline size={20} />
      </button>
    </div>
  );
};
