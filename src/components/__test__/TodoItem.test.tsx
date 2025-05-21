import { fireEvent, render } from "@testing-library/react";
import { TodoItem } from "../TodoItem";

const mockTodo = {
  id: "1",
  title: "Todo 1",
  completed: false,
};

describe("Testing in <TodoItem /> component", () => {
  test("should be equal to snapshot", () => {
    const item = render(
      <TodoItem
        todo={mockTodo}
        onDeleteTodo={jest.fn()}
        onToggleTodo={jest.fn()}
      />
    );

    expect(item).toMatchSnapshot();
  });

  test("should render the Todo title passed via props", () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        onDeleteTodo={jest.fn()}
        onToggleTodo={jest.fn()}
      />
    );
    expect(getByText("Todo 1")).toBeInTheDocument();
  });

  test("should apply completed styles to the title when Todo is marked as complete", () => {
    const onToggleTodo = jest.fn();

    const { getByRole, getByText, rerender } = render(
      <TodoItem
        todo={mockTodo}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={jest.fn()}
      />
    );
    const checkbox = getByRole("checkbox");
    const titleParagraph = getByText("Todo 1");
    expect(titleParagraph.className).not.toContain("line-through");
    expect(titleParagraph.className).not.toContain("text-gray-400");

    fireEvent.click(checkbox);

    expect(onToggleTodo).toHaveBeenCalledWith("1");

    rerender(
      <TodoItem
        todo={{ ...mockTodo, completed: true }}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={jest.fn()}
      />
    );

    const updatedTitleParagraph = getByText("Todo 1");

    expect(updatedTitleParagraph.className).toContain("line-through");
    expect(updatedTitleParagraph.className).toContain("text-gray-400");
  });

  test("should called the onDeleteTodo and delete the Todo of the document", () => {
    const onDeleteTodo = jest.fn();
    const { getByRole, rerender, queryByText } = render(
      <TodoItem
        todo={mockTodo}
        onToggleTodo={jest.fn()}
        onDeleteTodo={onDeleteTodo}
      />
    );
    const deleteButton = getByRole("button");
    fireEvent.click(deleteButton);
    expect(onDeleteTodo).toHaveBeenCalledWith("1");

    rerender(<></>);
    expect(queryByText("Todo 1")).not.toBeInTheDocument();
  });
});
