import React, { useState } from "react";
import { Task } from "../../interface/Task";
import TaskList from "../Task/TaskList";
import TaskModal from "../TaskModal/TaskModal";
import "./TaskContainer.css";

interface TaskContainerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContainer: React.FC<TaskContainerProps> = ({ tasks, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = (task: Task) => {
    if (taskToEdit) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  return (
    <div className="task-container">
      <div className="st">
        <h2>Tarefas</h2>
        <button onClick={openModal} className="add-task-button">
          Adicionar Tarefa
        </button>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} onEditTask={setTaskToEdit} openModal={openModal} />
      <TaskModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSaveTask={handleSaveTask}
        taskToEdit={taskToEdit || undefined}
      />
    </div>
  );
};

export default TaskContainer;
