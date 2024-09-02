import React, { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";
import { Task, TaskFormProps } from "../../interface/Task";

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
    };

    // Chame a função `onAddTask`, que será responsável por adicionar ou atualizar a tarefa
    onAddTask(updatedTask);

    // Limpar os campos após o envio do formulário
    setTitle("");
    setDescription("");
  };

  return (
    <form className={styles["task-form"]} onSubmit={handleSubmit}>
      <h2>{taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}</h2>
      <label>
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">{taskToEdit ? "Atualizar" : "Adicionar"}</button>
    </form>
  );
};

export default TaskForm;
