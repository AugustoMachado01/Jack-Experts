import { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../interface/Task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
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

    fetchTasks();
  }, []);

  return { tasks, setTasks };
};

export default useTasks;
