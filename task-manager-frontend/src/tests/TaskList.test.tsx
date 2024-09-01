import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../components/Task/TaskList";

const mockSetTasks = jest.fn();
const mockTasks = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
];

test("renders tasks and handles delete", () => {
  render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

  // Verifica se as tarefas são renderizadas
  mockTasks.forEach((task) => {
    expect(screen.getByText(task.title)).toBeInTheDocument();
  });

  // Simula o clique no botão de delete da primeira tarefa
  const deleteButtons = screen.getAllByText("Delete");
  fireEvent.click(deleteButtons[0]);

  // Verifica se setTasks foi chamado corretamente
  expect(mockSetTasks).toHaveBeenCalledWith(
    mockTasks.filter((task) => task.id !== 1)
  );
});
