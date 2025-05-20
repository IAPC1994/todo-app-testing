"use client";

import React, { FormEvent, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

interface Props {
  onAddTodo: (text: string) => void;
}

export const TodoForm = ({ onAddTodo }: Props) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAddTodo(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:flex-row gap-5 justify-between"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task..."
        className="bg-neutral-200 rounded-lg px-4 py-2 text-black flex-1 focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 px-4 py-2 font-bold rounded-lg transition"
      >
        <IoAddOutline size={20} />
        Add Task
      </button>
    </form>
  );
};
