import { fireEvent, render, screen } from "@testing-library/react";
import { TodoForm } from "../TodoForm";

describe("Testing in <TodoForm />", () => {
  test("should match snapshot", () => {
    render(<TodoForm onAddTodo={jest.fn()} />);
    expect(screen).toMatchSnapshot();
  });

  test("should execute onAddTodo when input filled and Add button is clicked", () => {
    const onAddTodo = jest.fn();
    render(<TodoForm onAddTodo={onAddTodo} />);
    const addButton = screen.getByRole("button");
    const inputText = screen.getByPlaceholderText("New task...");
    fireEvent.change(inputText, { target: { value: "Hello" } });
    fireEvent.click(addButton);
    expect(onAddTodo).toHaveBeenCalledWith("Hello");
  });

  test("should not execute onAddTodo when input is empty and Add button is clicked", () => {
    const onAddTodo = jest.fn();
    render(<TodoForm onAddTodo={onAddTodo} />);
    const addButton = screen.getByRole("button");
    const inputText = screen.getByPlaceholderText("New task...");
    fireEvent.change(inputText, { target: { value: "" } });
    fireEvent.click(addButton);
    expect(onAddTodo).not.toHaveBeenCalled();
  });

  test("should clear the input when a Todo is added", () => {
    const onAddTodo = jest.fn();
    render(<TodoForm onAddTodo={onAddTodo} />);
    const addButton = screen.getByRole("button");
    const inputText = screen.getByPlaceholderText("New task...");
    fireEvent.change(inputText, { target: { value: "Hello" } });
    fireEvent.click(addButton);
    expect(inputText).toHaveValue("");
  });

  test("should submit the form when the key enter is pressed", () => {
    const onAddTodo = jest.fn();
    render(<TodoForm onAddTodo={onAddTodo} />);

    const inputText = screen.getByPlaceholderText("New task...");
    const form = screen.getByTestId("todo-form");
    fireEvent.change(inputText, { target: { value: "Test task" } });
    fireEvent.submit(form);

    expect(onAddTodo).toHaveBeenCalledWith("Test task");
  });
});
