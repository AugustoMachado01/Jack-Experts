import React, { useState } from "react";
import axios from "axios";
import { Task } from "../../interface/Task";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './TaskForm.css'

interface TaskFormProps {
  onSaveTask: (task: Task) => void;
  taskToEdit?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSaveTask, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [errors, setErrors] = useState({ title: "", description: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: "", description: "" };

    if (title.trim() === "") {
      newErrors.title = "O título é obrigatório";
      isValid = false;
    }
    if (description.trim() === "") {
      newErrors.description = "A descrição é obrigatória";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
    };

    try {
      if (taskToEdit) {
        const response = await axios.put(`http://localhost:3000/tasks/${taskToEdit.id}`, newTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSaveTask(response.data);
        toast.success("Tarefa atualizada com sucesso!");
      } else {
        const response = await axios.post("http://localhost:3000/tasks", newTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSaveTask(response.data);
        toast.success("Tarefa adicionada com sucesso!");
      }
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao salvar tarefa", error);
      toast.error("Erro ao salvar a tarefa!");
    }
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <label>
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </label>
      <label>
        Descrição:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </label>
      <button type="submit">{taskToEdit ? "Atualizar" : "Adicionar"}</button>
    </form>
  );
};

export default TaskForm;
