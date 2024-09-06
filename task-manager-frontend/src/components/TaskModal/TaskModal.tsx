import React from "react";
import Modal from "react-modal";
import TaskForm from "../Task/TaskForm";
import "./TaskModal.css";
import { Task } from "../../interface/Task";

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSaveTask: (task: Task) => void;
  taskToEdit?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onRequestClose, onSaveTask, taskToEdit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={taskToEdit ? "Editar Tarefa" : "Adicionar Tarefa"}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>{taskToEdit ? "Editar Tarefa" : "Adicionar Tarefa"}</h2>
      <TaskForm
        onSaveTask={(task) => {
          onSaveTask(task);
          onRequestClose();
        }}
        taskToEdit={taskToEdit}
      />
      <button onClick={onRequestClose} className="close-modal-button">
        Fechar
      </button>
    </Modal>
  );
};

export default TaskModal;
