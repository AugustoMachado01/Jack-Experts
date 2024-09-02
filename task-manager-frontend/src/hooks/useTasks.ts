import { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../interface/Task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função para buscar tarefas do backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:3000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar tarefas");
    }
  };

  useEffect(() => {
    fetchTasks(); // Carrega as tarefas ao montar o componente
  }, []);

  return { tasks, setTasks, fetchTasks };
};

export default useTasks;
