import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/Task/TaskForm";

// Função mock para verificar se onAddTask é chamada
const mockOnAddTask = jest.fn();

describe("TaskForm", () => {
  it("should call onAddTask with the task input value when the form is submitted", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    // Simule a entrada de dados
    fireEvent.change(screen.getByPlaceholderText("Add a new task"), {
      target: { value: "New Task" },
    });

    // Simule o envio do formulário
    fireEvent.click(screen.getByText("Add Task"));

    // Verifique se onAddTask foi chamado com o valor correto
    expect(mockOnAddTask).toHaveBeenCalledWith("New Task");
  });
});
