import { Todo } from "@/interfaces";
import { TodoList } from "../TodoList";
import { fireEvent, render, screen } from "@testing-library/react";

const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Todo 1",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    completed: true,
  },
];

describe("Testing in <TodoList/>", () => {
  test("should display the Todos recieved via props", () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={jest.fn()}
        onDeleteTodo={jest.fn()}
      />
    );

    const todo1 = screen.getByText("Todo 1");
    const todo2 = screen.getByText("Todo 2");

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });

  test("should call onToggleTodo when checkbox of Todo 2 is clicked", () => {
    const onToggleTodo = jest.fn();
    const { getAllByRole } = render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={jest.fn()}
      />
    );

    const checkboxTodo2 = getAllByRole("checkbox")[1];

    fireEvent.click(checkboxTodo2);

    expect(onToggleTodo).toHaveBeenCalledWith("2");
  });

  test("should call onDeleteTodo when delete button of Todo 2 is clicked", () => {
    const onDeleteTodo = jest.fn();
    const { getByTestId } = render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={jest.fn()}
        onDeleteTodo={onDeleteTodo}
      />
    );

    const deleteButtonTodo2 = getByTestId("delete-btn-2");

    fireEvent.click(deleteButtonTodo2);

    expect(onDeleteTodo).toHaveBeenCalledWith("2");
  });
});
