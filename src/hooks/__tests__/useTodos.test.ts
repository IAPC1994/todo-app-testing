import { act, renderHook } from "@testing-library/react";
import { useTodos } from "../useTodos";

const mockTodos = [
  { id: "1", title: "Todo 1", completed: false },
  { id: "2", title: "Todo 2", completed: true },
];

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockTodos));
  Storage.prototype.setItem = jest.fn();
});

describe("useTodos Testing", () => {
  test("should upload the Todos from the localStorage", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual(mockTodos);
  });

  test("should add a Todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo("Todo 3");
    });

    expect(result.current.todos).toHaveLength(3);
  });

  test("should save to localStorage when adding a Todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo("Todo 3");
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "todos",
      JSON.stringify(result.current.todos)
    );
  });

  test("should toggle a Todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.toggleTodo("1");
    });

    const todo = result.current.todos.find((todo) => todo.id === "1");

    expect(todo?.completed).toBe(true);

    act(() => {
      result.current.toggleTodo("1");
    });

    expect(
      result.current.todos.find((todo) => todo.id === "1")!.completed
    ).toBe(false);
  });

  test("should delete a Todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.deleteTodo("1");
    });

    expect(
      result.current.todos.find((todo) => todo.id === "1")
    ).toBeUndefined();
    expect(result.current.todos).toHaveLength(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "todos",
      JSON.stringify(result.current.todos)
    );
  });

  test("should return null if the localStorage is empty", () => {
    Storage.prototype.getItem = jest.fn(() => null);
    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toHaveLength(0);
    expect(result.current.todos).toStrictEqual([]);
  });
});
