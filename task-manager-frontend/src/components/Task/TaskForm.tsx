import React, { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";
import { Task, TaskFormProps } from "../../interface/Task";

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : new Date().toISOString(),
      title,
      description,
    };

    onAddTask(newTask);

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
