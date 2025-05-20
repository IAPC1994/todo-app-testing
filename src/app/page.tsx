"use client";
import { TodoForm, TodoList } from "@/components";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <>
      <main className="min-w-full min-h-dvh flex flex-col gap-5 items-center p-5">
        <h1 className="text-4xl md:text-8xl font-bold drop-shadow-md">
          To-Do List App
        </h1>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </main>
    </>
  );
}
